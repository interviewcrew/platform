import { Container } from "@/components/Container";

const companies = [
  "Ramp",
  "Instacart", 
  "Duolingo",
  "OpenAI",
  "Substack",
  "Anthropic",
  "Spotify",
  "Airbnb",
  "Notion",
  "Nike",
  "Slack",
  "Loom",
  "Figma",
  "Google",
  "The New York Times",
  "Dropbox"
];

export function ExceptionalLeaders() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Trusted by fast-growing companies and innovative startups.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Leaders in hyper-growth companies and VCs are using InterviewCrew to connect with people in their networks.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <span className="text-slate-600 font-medium text-sm">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
