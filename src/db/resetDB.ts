import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  organizationsTable,
  usersTable,
  problemsTable,
  programmingLanguagesTable,
  languagesTable,
  evaluationMetricsTable,
} from "@/db/schema";
import { supportedLangs } from "@/app/supportedIDEConfigs";
import dotenv from "dotenv";
import * as schema from "@/db/schema";

dotenv.config({ path: ".env.local" });

async function resetDB(): Promise<void> {
  const db = drizzle(sql, { schema });

  // Deletion happens in cascade
  await db.delete(organizationsTable);
  await db.delete(programmingLanguagesTable);
  await db.delete(languagesTable);
  await db.delete(evaluationMetricsTable);

  if (process.env.NODE_ENV === "production") {
    throw new Error("Resetting the database is not allowed in production");
  }

  if (
    !process.env.CLERK_SAMPLE_ORG_ID1 ||
    !process.env.CLERK_SAMPLE_ORG_ID2 ||
    !process.env.CLERK_SAMPLE_USER_ID1 ||
    !process.env.CLERK_SAMPLE_USER_ID2
  ) {
    throw new Error(
      "Please provide the organization and user id in the .env file"
    );
  }

  const insertedOrganizations = await db
    .insert(organizationsTable)
    .values([
      {
        name: "InterviewCrew 1",
        externaleId: process.env.CLERK_SAMPLE_ORG_ID1,
        slug: "interviewcrew-1",
      },
      {
        name: "InterviewCrew 2",
        externaleId: process.env.CLERK_SAMPLE_ORG_ID2,
        slug: "interviewcrew-2",
      },
    ])
    .returning({ id: organizationsTable.id, name: organizationsTable.name });

  const user = await db
    .insert(usersTable)
    .values([
      {
        externalId: process.env.CLERK_SAMPLE_USER_ID1,
        organizationId: insertedOrganizations[0].id,
      },
      {
        externalId: process.env.CLERK_SAMPLE_USER_ID2,
        organizationId: insertedOrganizations[1].id,
      },
    ])
    .returning({
      id: usersTable.id,
      externalId: usersTable.externalId,
      organizationId: usersTable.organizationId,
    });

  await db
    .insert(programmingLanguagesTable)
    .values(
      supportedLangs.map((lang) => ({ id: lang.id, name: lang.language }))
    );

  const problem = await db
    .insert(problemsTable)
    .values({
      title: "Minimum Time to Make Rope Colorful",
      description: `
### [1578. Minimum Time to Make Rope Colorful](https://leetcode.com/problems/minimum-time-to-make-rope-colorful/?envType=daily-question&envId=2023-12-27)

Difficulty: Medium

Likes: 3.7K | Dislikes: 129

---

Alice has \`n\` balloons arranged on a rope. You are given a **0-indexed** string \`colors\` where \`colors[i]\` is the color of the \`i^th\` balloon.

Alice wants the rope to be **colorful**. She does not want **two consecutive balloons** to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it **colorful**. You are given a **0-indexed** integer array \`neededTime\` where \`neededTime[i]\` is the time (in seconds) that Bob needs to remove the \`i^th\` balloon from the rope.

_Return the **minimum time** Bob needs to make the rope **colorful**._

### Example 1:

![Balloon Example 1](https://assets.leetcode.com/uploads/2021/12/13/ballon1.jpg)

\`\`\`plaintext
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
Bob can remove the blue balloon at index 2. This takes 3 seconds.
There are no longer two consecutive balloons of the same color. Total time = 3.
\`\`\`
### Example 2:

![Balloon Example 2](https://assets.leetcode.com/uploads/2021/12/13/balloon2.jpg)

\`\`\`plaintext
Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
\`\`\`
### Example 3:

![Balloon Example 3](https://assets.leetcode.com/uploads/2021/12/13/balloon3.jpg)

\`\`\`plaintext
Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob will remove the balloons at indices 0 and 4. Each balloon takes 1 second to remove.
There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.
\`\`\`
### Constraints:

- \`n == colors.length == neededTime.length\`
- \`1 <= n <= 10^5\`
- \`1 <= neededTime[i] <= 10^4\`
- \`colors\` contains only lowercase English letters.

---

Accepted: 243.5K | Submissions: 380.4K | Acceptance Rate: 64.0%

---

Related Topics: [Array](/tag/array/), [String](/tag/string/), [Dynamic Programming](/tag/dynamic-programming/), [Greedy](/tag/greedy/)

---

Copyright ©️ 2023 LeetCode All rights reserved
    `,
    })
    .returning({
      id: problemsTable.id,
      title: problemsTable.title,
      description: problemsTable.description,
    });

  const languages = await db
    .insert(languagesTable)
    .values({
      name: "English",
    })
    .returning({ id: languagesTable.id, name: languagesTable.name });

  // const jobListings = await db
  //   .insert(jobListingsTable)
  //   .values([
  //     {
  //       title: "Startup co-founder",
  //       description:
  //         "We want someone to join us as a co-founder for building a startup. \
  //                     We are looking for a full-stack developer with experience in building startups.",
  //       position: "Technical co-founder",
  //       seniority: "Senior",
  //       organizationId: user[0].organizationId,
  //     },
  //     {
  //       organizationId: user[0].organizationId,
  //     },
  //   ])
  //   .returning({
  //     id: jobListingsTable.id,
  //     title: jobListingsTable.title,
  //     description: jobListingsTable.description,
  //   });

  // const candidates = await db
  //   .insert(candidatesTable)
  //   .values([
  //     {
  //       name: "Sadjad Fallah",
  //       email: "m.sadjad.fallah@gmail.com",
  //       about:
  //         "I am a staff backend software engineer at Emma with more than 15 years of experience. \
  //          I have a software engineering degree for my bachelor's and for my master's I have a computer science degree with the focus of AI.\
  //          Most of my career I had my own startups and I worked with many stacks. In the past 4 years, I worked for others as an employee. \
  //          Currently I'm building my own startup again",
  //       organizationId: user[0].organizationId,
  //     },
  //     {
  //       organizationId: user[0].organizationId,
  //     },
  //   ])
  //   .returning({
  //     id: candidatesTable.id,
  //     name: candidatesTable.name,
  //     email: candidatesTable.email,
  //   });

  // const interview = await db
  //   .insert(interviewsTable)
  //   .values([
  //     {
  //       title: "Interview Mehdi <> Sadjad",
  //       hash: "dpv-yhep-xer",
  //       organizationId: user[0].organizationId,
  //       languageId: languages[0].id,
  //       // jobListingId: jobListings[0].id,
  //       // candidateId: candidates[0].id,
  //       createdAt: new Date(interview1Transcription[0].createdAt),
  //       updatedAt: new Date(interview1Transcription[0].createdAt),
  //     },
  //     {
  //       title: "Interview online",
  //       hash: "ime-dxge-aaz",
  //       organizationId: user[0].organizationId,
  //       // jobListingId: jobListings[1].id,
  //       // candidateId: candidates[1].id,
  //       createdAt: calculateDatePlusTime(interview2Transcription[0].createdAt),
  //       updatedAt: calculateDatePlusTime(interview2Transcription[0].createdAt),
  //     },
  //   ])
  //   .returning({
  //     id: interviewsTable.id,
  //     title: interviewsTable.title,
  //     hash: interviewsTable.hash,
  //     organizationId: interviewsTable.organizationId,
  //   });

  // await db.insert(transcriptionsTable).values([
  //   ...interview1Transcription.map((interviewTranscription, index) => ({
  //     interviewId: interview[0].id,
  //     speaker: interviewTranscription.speaker,
  //     transcription: interviewTranscription.transcription,
  //     createdAt: new Date(interviewTranscription.createdAt),
  //     updatedAt: new Date(interviewTranscription.createdAt),
  //     userId: user[0].id,
  //     order: index + 1,
  //   })),
  //   ...interview2Transcription.map((interviewTranscription, index) => ({
  //     interviewId: interview[1].id,
  //     speaker: interviewTranscription.speaker,
  //     transcription: interviewTranscription.transcription,
  //     createdAt: calculateDatePlusTime(interviewTranscription.createdAt),
  //     updatedAt: calculateDatePlusTime(interviewTranscription.createdAt),
  //     userId: user[0].id,
  //     order: index + 1,
  //   })),
  // ]);

  // await db.insert(submissionsTable).values(
  //   interview1Submission.map((interviewSubmission, index) => ({
  //     interviewId: interview[1].id,
  //     programmingLanguageId: 62,
  //     code: interviewSubmission.code.join("\n"),
  //     result: interviewSubmission.result.join("\n"),
  //     createdAt: calculateDatePlusTime(interviewSubmission.createdAt),
  //     userId: user[0].id,
  //     order: index + 1,
  //   }))
  // );

  await db.insert(evaluationMetricsTable).values([
    {
      name: "Considerations",
      description: "What was noticable about the candidate",
      prompt:
        "You are a highly skilled AI technical interviewer that is an expert in assessing candidates. \
         You have amazing judgement and want to optimize for not having false positives and false negatives hires. \
         I would like you to read the interview plus the codes from the candidate if there are any, \
         and list all the considerations that we should have about this candidate.\
         Please be concise and clear on every points of your answer.",
    },
  ]);
}

function calculateDatePlusTime(timeToAdd: string): Date {
  const now = new Date();

  const [hours, minutes, seconds] = timeToAdd.split(":").map(Number);

  const createdAt = new Date(now.getTime());
  createdAt.setHours(createdAt.getHours() + hours);
  createdAt.setMinutes(createdAt.getMinutes() + minutes);
  createdAt.setSeconds(createdAt.getSeconds() + seconds);

  return createdAt;
}

resetDB().then(() => {
  console.log("Database reset");
});
