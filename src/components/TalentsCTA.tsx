import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function TalentsCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Ready to find your next role?
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            Get evaluated once. Join a trusted network.
          </p>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We'll match you with opportunities that actually fit your skills and goals.
          </p>
          <div className="mt-10">
            <Button
              href="#join-pool"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
            >
              → Apply to the Talent Pool
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}


