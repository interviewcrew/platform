import { Container } from "@/components/Container";

const stories = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Stripe",
    image: "S",
    quote: "InterviewCrew connected me with my dream role at Stripe through a mutual connection. The process was seamless and the match was perfect.",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "Figma",
    image: "M",
    quote: "I was skeptical about networking platforms, but InterviewCrew's approach of quality over quantity really works. Found my ideal role in 3 weeks.",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist",
    company: "OpenAI",
    image: "E",
    quote: "The AI matching system understood my skills better than any recruiter. I'm now working on cutting-edge AI projects that align with my passion.",
    gradient: "from-green-400 to-emerald-500"
  }
];

export function TalentSuccessStories() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Success stories from our talent pool
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            See how talented professionals have found their dream roles through InterviewCrew's network-driven approach.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stories.map((story, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${story.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                    {story.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{story.name}</div>
                    <div className="text-sm text-slate-600">{story.role}</div>
                    <div className="text-sm text-blue-600 font-medium">{story.company}</div>
                  </div>
                </div>
                <blockquote className="text-slate-700 italic">
                  "{story.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


