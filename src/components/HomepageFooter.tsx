import Link from "next/link";

import { Container } from "@/components/Container";
import { InterviewCrewLogo } from "@/components/InterviewCrewLogo";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <div>
            <div className="mb-4">
              <InterviewCrewLogo className="h-8 w-auto" variant="dark" />
            </div>
            <p className="text-slate-600">
              Get in touch: support@interviewcrew.com
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center border-t border-slate-200 py-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            InterviewCrew 2023. All Rights Reserved.
          </p>
          <div className="flex gap-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
