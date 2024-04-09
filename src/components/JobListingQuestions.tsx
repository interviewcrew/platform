import { getQuestionsForJobListing } from "@/app/job-listing-actions";
import {
  JobListingListItem,
  addQuestionsToJobListing,
} from "@/db/repositories/jobListingRepository";
import { Question } from "@/db/schema";
import { useEffect, useState } from "react";

type GeneratedQuestion = {
  question: string;
  added: boolean;
};

export default function JobListingQuestions({
  jobListing,
  userId,
}: {
  userId: number;
  jobListing: JobListingListItem;
}) {
  const [questions, setQuestions] = useState<Question[]>(jobListing.questions);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [shouldGenerateQuestions, setShouldGenerateQuestions] = useState(false);

  useEffect(() => {
    const generateQuestions = async () => {
      const questions = await getQuestionsForJobListing(jobListing, userId);

      setGeneratedQuestions(questions);
      setShouldGenerateQuestions(false);
    };

    if (shouldGenerateQuestions) {
      generateQuestions();
    }
  }, [
    questions,
    shouldGenerateQuestions,
    jobListing,
    userId,
    generatedQuestions,
  ]);

  return (
    <>
      <button
        onClick={() => {
          setShouldGenerateQuestions(true);
        }}
      >
        Generate questions
      </button>
      <div>These are the questions</div>
      {questions.map((question) => (
        <div key={question.id}> {question.question} </div>
        // <div key={question.id}>
        //   <label htmlFor={String(question.id)}>{question.question}</label>
        //   <input
        //     type="text"
        //     value={question.question}
        //     id={String(question.id)}
        //   />
        // </div>
      ))}
      <div>These are the generated Questions</div>
      {generatedQuestions.map((question) => (
        <div key={question}>{question}</div>
      ))}
    </>
  );
}
