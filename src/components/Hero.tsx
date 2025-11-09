import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-20 pt-16 text-center lg:pt-24">
        <h1 className="mx-auto max-w-4xl font-satoshi text-[56px] sm:text-[64px] font-bold leading-[110%] tracking-tight text-slate-900">
          Get real interview feedback and unlock career opportunities.
      </h1>
        <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-[150%] text-slate-600">
          Master the technical interview. Book a free mock interview for coding, and system design. Receive detailed feedback to pinpoint your needs, and qualify for our vetted talent pool connecting you with top companies.
        </p>
        <div className="mt-10">
          <Button
            href="https://forms.gle/xrCJx96rF86HDL576"
            className="bg-slate-900 text-white px-8 py-3 rounded-lg font-satoshi text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
          >
            → Book Your Mock Interview
          </Button>
        </div>
    </Container>
    </div>
  );
}
