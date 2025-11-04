import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function NetworkingWithoutNoise() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-orange-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Networking without the noise.
          </h2>
          <div className="mt-10">
            <Button
              href="#request-access"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Request access
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}


