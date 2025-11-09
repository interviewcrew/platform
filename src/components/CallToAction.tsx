import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="text-center">
          <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900">
            Get started today
          </h2>
          <p className="mt-6 font-inter text-lg leading-[150%] text-slate-600 max-w-2xl mx-auto">
            Looking to hire? Book a session with us to discuss how we can help you find the right talent.
          </p>
          <div className="mt-10">
            <Button
              href="https://zeeg.me/interviewcrew/introduction-call"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg font-satoshi text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
            >
              Book a session with us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
