import Editor from '@/components/Editor';
import { CompilerResults } from '@/components/Compiler';
import { InterviewLayout } from '@/components/IDELayout';
import Problem from '@/components/Problem';

export default function InterviewPage({ params }: { params: { organization: string, id: string } }) {
  const baseCode = `def calculate_total_cost(price, quantity, discount_percentage):
  if price < 0 or quantity < 0 or discount_percentage < 0:
      raise ValueError("Price, quantity, and discount percentage must be non-negative.")
  total_cost = (price * quantity) * (1 - discount_percentage / 100)
  return total_cost

# Example usage
total_cost = calculate_total_cost(20, 3, 15)
print(total_cost)  # Should print 51.0
`;

const problem = `### Coding Assignment: Calculate Total Order Cost with Discount

**Objective:** Write a function in Python that calculates the total cost of an order after applying a discount.

**Background:** In e-commerce, discounts are a common way to attract customers. Being able to calculate the final price after a discount is essential for both the user interface and backend calculations.

**Function Requirements:**

1. **Function Name:** \`calculate_total_cost\`
2. **Parameters:**
   - \`price\`: A float representing the original price of the item.
   - \`quantity\`: An integer representing the number of items.
   - \`discount_percentage\`: A float representing the discount percentage (e.g., 10 for 10%).
3. **Returns:** A float representing the total cost after applying the discount.

**Calculation to Implement:**
The total cost can be calculated using the formula:
\[ \text{Total Cost} = (\text{price} \times \text{quantity}) \times (1 - \frac{\text{discount\_percentage}}{100}) \]

**Example Usage:**
\`\`\`python
# Calculate the cost of 3 items priced at $20 each with a 15% discount
total_cost = calculate_total_cost(20, 3, 15)
print(total_cost)  # Expected Output: 51.0
\`\`\`

**Additional Challenge (Optional):**
- Add error handling to make sure the inputs are valid (e.g., non-negative numbers).
`;

  return (
    <InterviewLayout editor={
      <Editor baseCode={baseCode} />
    } compiler={<CompilerResults />} problem={<Problem problem={problem}/>}>
    </InterviewLayout>
  )
}