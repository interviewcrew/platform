import { Container } from "@/components/Container";

const steps = [
  {
    number: "1",
    title: "We interview every candidate.",
    description: "Structured technical and system design interviews run by senior engineers.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  },
  {
    number: "2",
    title: "We build the vetted pool.",
    description: "Only those who pass all steps join, roughly the top 1% of applicants.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
  {
    number: "3",
    title: "We match precisely.",
    description: "Based on your stack, goals, and team culture, we shortlist the best fits.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    )
  },
  {
    number: "4",
    title: "You meet and hire.",
    description: "You run one cultural fit interview and make the decision.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    )
  }
];

export function CompaniesProcess() {
  return (
    <section id="our-process" className="py-12 bg-slate-50 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-4 sm:px-0">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            We handle the hard part, you focus on hiring the right fit.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center space-x-4 mb-4">
                {step.icon}
                <div className="font-satoshi text-xl sm:text-2xl font-bold text-slate-900">
                  {step.number}
                </div>
              </div>
              <h3 className="font-inter text-lg sm:text-xl font-semibold leading-[130%] text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-sm sm:text-base leading-[150%] text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

