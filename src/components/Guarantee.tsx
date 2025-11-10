import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const guarantees = [
  {
    text: "No upfront risk",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    text: "No hidden fees",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    text: "Guaranteed technical quality",
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export function Guarantee() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-0">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            You pay only when the hire proves their value.
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg leading-[150%] text-slate-600 sm:mt-6">
            We stand behind our technical evaluation. You pay our fee only after the candidate passes their probation period.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-2">
                {guarantee.icon}
                <span className="font-inter text-sm sm:text-base font-medium text-slate-900">
                  {guarantee.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-10">
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

