"use client";

import { Container } from "@/components/Container";
import Image from "next/image";

type Company = {
  name: string;
  logo?: string;
  alt?: string;
};

const companies: Company[] = [
  { name: "Emma", logo: "/images/companies/emma-icon.svg", alt: "emma sleep" }
];

export function ExceptionalLeaders() {
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Trusted by teams that value engineering quality.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            We partner with companies that care about long-term growth, clean code, and good culture fit.
          </p>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            You'll only meet teams that are serious about building great products and treating developers as partners.
          </p>
        </div>
        
        <div className="mt-16 overflow-hidden">
          <div className="relative">
            <div className="flex animate-scroll w-fit pause-on-hover">
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-48 h-20"
                >
                  <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.alt || company.name}
                        width={160}
                        height={48}
                        className="grayscale contrast-200 object-contain w-full h-full"
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <span className="text-slate-900 font-semibold text-sm grayscale contrast-200">
                        {company.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
