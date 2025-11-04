import { Container } from "@/components/Container";

const matchingFeatures = [
  {
    title: "Smart Matching Algorithm",
    description: "Our AI-powered system analyzes your skills, experience, and preferences to find the perfect role matches.",
    icon: (
      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    )
  },
  {
    title: "Network Recommendations",
    description: "Get introduced to opportunities through your professional network and trusted connections.",
    icon: (
      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Quality Over Quantity",
    description: "We focus on meaningful matches rather than overwhelming you with irrelevant opportunities.",
    icon: (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  }
];

const stats = [
  { number: "85%", label: "Match success rate" },
  { number: "2.3x", label: "Faster hiring process" },
  { number: "500+", label: "Companies in our network" },
  { number: "10k+", label: "Successful placements" }
];

export function MatchingProcess() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            How we match you with the right opportunities
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Our sophisticated matching system combines AI technology with human insight to connect you with roles that truly fit your career goals.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {matchingFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Our track record speaks for itself
              </h3>
              <p className="text-slate-600">
                Join thousands of professionals who have found their dream roles through InterviewCrew
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


