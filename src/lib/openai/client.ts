import { EvaluationMetric, Transcription } from "@/db/schema";
import { mergeByCreatedAt } from "@/lib/utils";
import OpenAI from "openai";
import * as schema from "@/db/schema";
import {
  InterviewWithRelations,
  getAllInterviews,
} from "@/db/repositories/interviewRepository";
import { JobListingListItem } from "@/db/repositories/jobListingRepository";

export async function getFollowupQuestion(
  interview: InterviewWithRelations
): Promise<string | null> {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const followup = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a highly skilled AI technical interviewer that is an expert in asking follow up questions. \
                  I would like you to read the interview so far plus the codes from the candidate if there are any, \
                  and come up with a great follow up question to ask so that we learn more about the candidates skills. \
                  Please consider the level of seniority of the candidate based on the interview so far \
                  The position that the interview is ${interview.jobListing.seniority ?? "any seniority"}.\
                  come up with a follow up question that is suitable for that level of competence. 
                  The followup question should be very short`,
      },
      { role: "user", content: getInterviewDetailAsString(interview) },
    ],
  });

  return followup.choices[0].message.content;
}

export async function getEvaluationAndStoreInDB(
  evaluationMetric: EvaluationMetric,
  interview: Awaited<ReturnType<typeof getAllInterviews>>[0]
): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  if (evaluationMetric === undefined) {
    throw new Error("Evaluation metric not found");
  }

  const evaluation = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: evaluationMetric?.prompt ?? "",
      },
      { role: "user", content: getInterviewDetailAsString(interview) },
    ],
  });

  const evaluationText = evaluation.choices[0].message.content;

  if (!evaluationText) {
    throw new Error("No highlights found");
  }

  return evaluationText;
}

export async function generateJobListingQuestions(
  jobListing: JobListingListItem
): Promise<string[]> {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const questionsSoFar = jobListing.questions.map(
    (question) => question.question
  );

  const questions = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a highly skilled AI hiring manager that knows what are the best questions to ask based on a job ad. \
                  Read the job ad that is passed, and come up with a all the questions that should be asked for initial filtering of the candidate. \
                  Don't repeat any of the previous questions that are in the questions so far list. \
                  Ask about the technologies mentioned in the job ad in the level of the seniority level mentioned in the job ad\
                  The questions should be very short, and to the point. and should be returned in a valid json list of strings. For example ["What is Node.js", "How is concurrency handled in Node.js"]`,
      },
      {
        role: "user",
        content: `Job title: ${jobListing.title} \n Seniority: ${
          jobListing.seniority ?? "Any"
        } \n Position: ${
          jobListing.position ?? "Specified in the job title"
        } \n Job description: ${
          jobListing.description
        } \n Quesiotns so far: ${questionsSoFar}`,
      },
    ],
  });

  // TODO: handle the case when there are no questions
  let questionText = questions.choices[0].message.content;

  if (!questionText) {
    throw new Error("No questions found");
  }

  questionText = questionText.replace(/^```json/, "").replace(/```$/, "");

  try {
    return JSON.parse(questionText);
  } catch (e) {
    throw new Error("No questions found");
  }
}

function getInterviewDetailAsString(interview: InterviewWithRelations): string {
  const transcriptions: {
    type: "transcription";
    value: schema.Transcription[];
  } = { type: "transcription", value: interview.transcriptions };

  const submissions: {
    type: "submission";
    value: (typeof interview.submissions)[0][];
  } = {
    type: "submission",
    value: interview.submissions,
  };

  const interviewDetails = mergeByCreatedAt(transcriptions, submissions);

  return interviewDetails.reduce((interviewSoFar, item) => {
    if (item.type === "transcription") {
      interviewSoFar += `${item.value.speaker}: ${item.value.transcription}\n`;
    } else if (item.type === "submission") {
      interviewSoFar += `Code of the candidate in ${item.value.programmingLanguage.name}: ${item.value.code}\n \
                         execution results: ${item.value.result}\n`;
    }

    return interviewSoFar;
  }, "");
}
