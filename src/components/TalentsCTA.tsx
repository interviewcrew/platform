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
            Join our exclusive talent pool and get matched with opportunities at top companies through your professional network.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#join-pool"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Join our talent pool
            </Button>
            <Button
              href="#learn-more"
              className="bg-white text-slate-900 px-8 py-3 rounded-lg text-lg font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Learn more
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}


