import { Container } from "@/components/Container";

export function TheProblem() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-0">
          <h2 className="font-satoshi text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[120%] text-slate-900">
            The hiring process is broken.
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg leading-[150%] text-slate-600 sm:mt-6">
            AI-generated résumés and automated applications have flooded the market. You spend hours filtering noise, interviewing the wrong candidates, and still risk a poor fit.
          </p>
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-slate-50 rounded-lg border-l-4 border-blue-600">
            <p className="font-inter text-base sm:text-lg font-medium leading-[150%] text-slate-900">
              We solve that by sending you only verified, high-performing engineers.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

