import Editor from '@/components/Editor';
import Layout from '../../../new-layout';
import { SupportedLanguage } from '../../../supportedIDEConfigs';
import Compiler from '@/components/Compiler';
import { AssignmentLayout } from '@/components/AssignmentLayout';
import Problem from '@/components/Problem';

export default function AssignmentPage({ params }: { params: { company: string, id: string } }) {
  const baseCode = `function minCost(colors: string, neededTime: number[]): number {

};`;

const problem = `
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
`;

  const language: SupportedLanguage = { id: 78, language: "kotlin", engine: "Kotlin (1.3.70)" }

  return (
    <AssignmentLayout editor={
      <Editor language={language} baseCode={baseCode} />
    } compiler={<Compiler />} problem={<Problem problem={problem}/>}>
    </AssignmentLayout>
  )
}