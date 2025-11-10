import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function CallToAction() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="text-center px-4">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            Get started today
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg leading-[150%] text-slate-600 max-w-2xl mx-auto sm:mt-6">
            Looking to hire? Book a session with us to discuss how we can help you find the right talent.
          </p>
          <div className="mt-8 sm:mt-10">
            <Button
              href="https://zeeg.me/interviewcrew/introduction-call"
              className="bg-slate-900 text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-satoshi text-sm sm:text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
            >
              Book a session with us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
