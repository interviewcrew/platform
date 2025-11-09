import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { Container } from "@/components/Container";

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-satoshi text-[48px] sm:text-[56px] font-bold leading-[110%] text-slate-900 mb-6">
              Terms of Service
            </h1>
            <p className="font-inter text-base text-slate-600 mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate max-w-none">
              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  By accessing and using InterviewCrew's services, including but not limited to mock interviews, talent pool participation, and company hiring services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  2. Services Description
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  InterviewCrew provides technical interview services including:
                </p>
                <ul className="font-inter text-base leading-[150%] text-slate-700 mb-4 list-disc list-inside space-y-2 ml-4">
                  <li>Mock technical interviews for developers (coding, system design)</li>
                  <li>Detailed feedback and evaluation reports</li>
                  <li>Talent pool access for qualified candidates</li>
                  <li>Company hiring services with pre-vetted engineers</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  3. User Responsibilities
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="font-inter text-base leading-[150%] text-slate-700 mb-4 list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Respect the interview process and our interviewers</li>
                  <li>Use our services in good faith and for their intended purpose</li>
                  <li>Maintain confidentiality of any proprietary information shared during interviews</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  4. Payment Terms (For Companies)
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  For companies using our hiring services:
                </p>
                <ul className="font-inter text-base leading-[150%] text-slate-700 mb-4 list-disc list-inside space-y-2 ml-4">
                  <li>Payment is due only after a candidate successfully completes their probation period</li>
                  <li>No upfront fees or retainers are required</li>
                  <li>Free replacement is available within the probation period if a candidate does not meet expectations</li>
                  <li>All fees and terms will be clearly communicated before engagement</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  5. Talent Pool Participation
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  Participation in our talent pool is by invitation only, based on performance in mock interviews. By joining the talent pool, you consent to:
                </p>
                <ul className="font-inter text-base leading-[150%] text-slate-700 mb-4 list-disc list-inside space-y-2 ml-4">
                  <li>Being matched with companies based on your skills and preferences</li>
                  <li>Sharing your interview feedback and evaluation with potential employers</li>
                  <li>Participating in additional interviews with companies as part of the hiring process</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  6. Intellectual Property
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  All content, including interview questions, evaluation methods, and proprietary processes, are the intellectual property of InterviewCrew. You may not reproduce, distribute, or use our content for commercial purposes without explicit written permission.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  InterviewCrew provides evaluation and matching services. We do not guarantee job placement, and we are not responsible for the hiring decisions of companies or the performance of candidates in their roles. Our liability is limited to the fees paid for our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  8. Modifications to Terms
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-satoshi text-[28px] font-semibold leading-[120%] text-slate-900 mb-4">
                  9. Contact Information
                </h2>
                <p className="font-inter text-base leading-[150%] text-slate-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="font-inter text-base leading-[150%] text-slate-700">
                  Email: support@interviewcrew.com
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

