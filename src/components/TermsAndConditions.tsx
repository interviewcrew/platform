import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const terms = [
  "Pay only after successful probation.",
  "One fee per successful hire, no retainers.",
  "Free replacement within probation period.",
  "Confidential and secure process under NDA."
];

export function TermsAndConditions() {
  return (
    <section className="py-12 bg-slate-50 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto px-4 sm:px-0">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900 text-center mb-8 sm:mb-12">
            Simple, transparent terms.
          </h2>
          <ul className="space-y-4 mb-8 sm:mb-10">
            {terms.map((term, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter text-sm sm:text-base leading-[150%] text-slate-700">
                  {term}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Button
              href="https://zeeg.me/interviewcrew/introduction-call"
              className="bg-slate-900 text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-satoshi text-sm sm:text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
            >
              Book a session with us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

