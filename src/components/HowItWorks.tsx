import { Container } from "@/components/Container";

const talentBenefits = [
  {
    title: "Book mock interviews whenever you like",
    description: "",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  },
  {
    title: "Meet with your interviewer",
    description: "A senior engineer from top companies for virtual sessions.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Get detailed, actionable feedback",
    description: "About exactly what you need to work on to get the job you deserve.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  }
];

export function HowItWorks() {
  return (
    <section className="py-12 bg-slate-50 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center px-4">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            How InterviewCrew works
          </h2>
        </div>
        
        <div className="mt-10 sm:mt-12 lg:mt-16 px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {talentBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-4 mb-4">
                  {benefit.icon}
                  <h3 className="font-inter text-xl sm:text-2xl font-semibold leading-[130%] text-slate-900">
                    {benefit.title}
                  </h3>
                </div>
                {benefit.description && (
                  <p className="font-inter text-sm sm:text-base leading-[150%] text-slate-600">
                    {benefit.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
