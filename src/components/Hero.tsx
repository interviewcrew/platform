import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-12 pt-12 text-center sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-24">
        <h1 className="mx-auto max-w-4xl font-satoshi text-[32px] sm:text-[48px] lg:text-[64px] font-bold leading-[110%] tracking-tight text-slate-900 px-4">
          Get real interview feedback and unlock career opportunities.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-inter text-base sm:text-lg leading-[150%] text-slate-600 px-4 sm:mt-6">
          Master the technical interview. Book a free mock interview for coding, and system design. Receive detailed feedback to pinpoint your needs, and qualify for our vetted talent pool connecting you with top companies.
        </p>
        <div className="mt-8 sm:mt-10 px-4">
          <Button
            href="https://forms.gle/xrCJx96rF86HDL576"
            className="bg-slate-900 text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-satoshi text-sm sm:text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
          >
            → Book Your Mock Interview
          </Button>
        </div>
    </Container>
    </div>
  );
}
