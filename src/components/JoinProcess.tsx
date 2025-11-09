import { Container } from "@/components/Container";

const steps = [
  {
    number: "1",
    title: "Initial Interview",
    description: "We start with a short call to understand your background, strengths, and what kind of team you want to join.",
    iconGradient: "from-blue-300 to-purple-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    number: "2",
    title: "Technical Evaluation",
    description: "You'll go through a live coding session and a system design interview with experienced engineers.",
    iconGradient: "from-green-300 to-emerald-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    number: "3",
    title: "Join the Talent Pool",
    description: "If you pass, you'll join a curated pool of pre-vetted developers ready to be matched with top companies.",
    iconGradient: "from-purple-300 to-pink-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    number: "4",
    title: "Matched to the Right Company",
    description: "We connect you to teams where your skills and goals align. They'll run a cultural-fit interview, and if both sides agree, you get the offer.",
    iconGradient: "from-orange-300 to-yellow-400",
    icon: (
      <svg className="w-16 h-16 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export function JoinProcess() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            A clear process from evaluation to offer:
          </h2>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 items-start">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex flex-col h-full">
                <div className="relative flex justify-center mb-8">
                  <div className={`absolute w-32 h-32 bg-gradient-to-r ${step.iconGradient} rounded-full blur-3xl opacity-60`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 flex-grow">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


