import { Container } from "@/components/Container";

const benefits = [
  {
    title: "One evaluation opens doors to multiple companies",
    iconGradient: "from-pink-300 to-purple-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Technical interviews designed by real engineers",
    iconGradient: "from-purple-300 to-blue-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "Clear, transparent feedback at every step",
    iconGradient: "from-orange-300 to-yellow-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    title: "We only match you where there's a real fit - no spam or random outreach",
    iconGradient: "from-green-300 to-emerald-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Built to respect your time and skills",
    iconGradient: "from-blue-300 to-indigo-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export function WhyJoin() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why developers choose InterviewCrew:
          </h2>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="relative flex justify-center mb-8">
                  <div className={`absolute w-32 h-32 bg-gradient-to-r ${benefit.iconGradient} rounded-full blur-3xl opacity-60`}></div>
                  <div className="relative z-10 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 text-center">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center gap-16 flex-wrap">
            {benefits.slice(3).map((benefit, index) => (
              <div key={index + 3} className="text-center max-w-xs">
                <div className="relative flex justify-center mb-8">
                  <div className={`absolute w-32 h-32 bg-gradient-to-r ${benefit.iconGradient} rounded-full blur-3xl opacity-60`}></div>
                  <div className="relative z-10 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 text-center">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
