import Link from "next/link";

import { Container } from "@/components/Container";
import { InterviewCrewLogo } from "@/components/InterviewCrewLogo";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-12 sm:py-16 px-4 sm:px-0">
          <div>
            <div className="mb-4">
              <InterviewCrewLogo className="h-8 w-auto" variant="dark" />
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Get in touch: support@interviewcrew.com
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center border-t border-slate-200 py-8 sm:py-10 px-4 sm:px-0 sm:flex-row sm:justify-between">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            InterviewCrew 2023. All Rights Reserved.
          </p>
          <div className="flex gap-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-xs sm:text-sm text-slate-500 hover:text-slate-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs sm:text-sm text-slate-500 hover:text-slate-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
