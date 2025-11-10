import { Container } from "@/components/Container";

export function WhoWeWorkWith() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            Built for teams that care about engineering quality.
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg leading-[150%] text-slate-600 sm:mt-6">
            We partner with startups and scale-ups that value strong engineering culture, clean code, and reliable processes.
          </p>
        </div>
        <div className="mt-8 sm:mt-12">
          <div className="mx-auto mt-6 sm:mt-10 flex items-center justify-center gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 flex-wrap max-w-5xl px-4">
            <div className="flex items-center justify-center h-10 sm:h-12 flex-shrink-0">
              <img
                alt="Emma"
                src="/images/companies/emma-icon.svg"
                className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-10 sm:h-12 flex-shrink-0">
              <img
                alt="faircado"
                src="/images/companies/faircado-logo.svg"
                className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-10 sm:h-12 flex-shrink-0">
              <img
                alt="zeeg"
                src="/images/companies/zeeg-logo.svg"
                className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain"
              />
            </div>
            <div className="flex items-center justify-center h-10 sm:h-12 flex-shrink-0">
              <img
                alt="Enop AI"
                src="/images/companies/enop-ai-logo.svg"
                className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-[140px] object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

