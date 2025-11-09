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
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by the world's most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {companies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="col-span-2 max-h-12 w-full flex items-center justify-center lg:col-span-1"
            >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.alt || company.name}
                  width={158}
                  height={48}
                  className="max-h-12 w-full object-contain grayscale"
                />
              ) : (
                <span className="text-gray-900 font-semibold text-sm">
                  {company.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
