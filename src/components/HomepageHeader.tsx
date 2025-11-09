"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { InterviewCrewLogo } from "@/components/InterviewCrewLogo";

export function Header() {
  return (
    <header className="py-6">
      <Container>
        <nav className="relative z-50 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <InterviewCrewLogo className="h-8 w-auto" variant="dark" />
            </Link>
          </div>
          <div className="flex items-center gap-x-8">
            <Link href="/for-companies" className="text-slate-700 hover:text-slate-900 transition-colors">
              For Companies
            </Link>
            <Button
              href="https://zeeg.me/interviewcrew/introduction-call"
              className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Book a session with us
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
