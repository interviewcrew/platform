import { Container } from "@/components/Container";

export function TheProblem() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900">
            The hiring process is broken.
          </h2>
          <p className="mt-6 font-inter text-lg leading-[150%] text-slate-600">
            AI-generated résumés and automated applications have flooded the market. You spend hours filtering noise, interviewing the wrong candidates, and still risk a poor fit.
          </p>
          <div className="mt-8 p-6 bg-slate-50 rounded-lg border-l-4 border-blue-600">
            <p className="font-inter text-lg font-medium leading-[150%] text-slate-900">
              We solve that by sending you only verified, high-performing engineers.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

