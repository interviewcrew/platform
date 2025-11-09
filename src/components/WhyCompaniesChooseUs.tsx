import { Container } from "@/components/Container";

const benefits = [
  "Each candidate passes live technical and system design interviews.",
  "We evaluate communication and collaboration, not just code.",
  "Every profile includes structured feedback.",
  "No résumé spam, every candidate is human-screened.",
  "Hire faster: from shortlist to start in days, not months."
];

export function WhyCompaniesChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900 text-center mb-12">
            Why teams trust Interview Crew.
          </h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter text-base leading-[150%] text-slate-700">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

