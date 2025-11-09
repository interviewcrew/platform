import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import Link from "next/link";

export function CompaniesHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-20 pt-16 text-center lg:pt-24">
        <h1 className="mx-auto max-w-4xl font-satoshi text-[56px] sm:text-[64px] font-bold leading-[110%] tracking-tight text-slate-900">
          Hire the top 1% of engineers who deliver from day one.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-[150%] text-slate-600">
          We pre-interview, test, and verify every developer before they reach you. You meet only proven A-players who match your team technically and culturally, and you pay only after they pass probation.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            href="https://zeeg.me/interviewcrew/introduction-call"
            className="bg-slate-900 text-white px-8 py-3 rounded-lg font-satoshi text-base font-semibold leading-[120%] hover:bg-slate-800 transition-colors"
          >
            Book a session with us
          </Button>
          <Link
            href="#our-process"
            className="font-inter text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            See How Our Process Works
          </Link>
        </div>
      </Container>
    </div>
  );
}

