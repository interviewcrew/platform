import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function CompaniesClosingCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900">
            Let&apos;s make hiring simple again.
          </h2>
          <p className="mt-6 font-inter text-lg leading-[150%] text-slate-600">
            Tell us what you&apos;re hiring for. We&apos;ll send you a shortlist of fully vetted engineers ready to join your team.
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

