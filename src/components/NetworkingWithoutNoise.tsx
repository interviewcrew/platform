import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function NetworkingWithoutNoise() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-orange-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="text-center px-4">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            Take the guesswork out of prepping for technical interviews
          </h2>
          <div className="mt-8 sm:mt-10">
            <Button
              href="https://forms.gle/xrCJx96rF86HDL576"
              className="bg-slate-900 text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-satoshi text-sm sm:text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
            >
              → Book Your Mock Interview
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}


