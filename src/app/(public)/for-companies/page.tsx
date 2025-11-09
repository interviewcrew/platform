import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { CompaniesHero } from "@/components/CompaniesHero";
import { TheProblem } from "@/components/TheProblem";
import { CompaniesProcess } from "@/components/CompaniesProcess";
import { Guarantee } from "@/components/Guarantee";
import { WhyCompaniesChooseUs } from "@/components/WhyCompaniesChooseUs";
import { WhoWeWorkWith } from "@/components/WhoWeWorkWith";
import { TermsAndConditions } from "@/components/TermsAndConditions";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserByExternalId } from "@/db/repositories/userRepository";

export default async function ForCompanies() {
  const loadedUser = await currentUser();

  if (loadedUser) {
    const loggedInUser = await getUserByExternalId(loadedUser.id);
    if (loggedInUser && loggedInUser.organizationId) {
      return redirect("/dashboard");
    }
  }

  return (
    <>
      <Header />
      <main>
        <CompaniesHero />
        <Separator />
        <TheProblem />
        <Separator />
        <CompaniesProcess />
        <Separator />
        <Guarantee />
        <Separator />
        <WhyCompaniesChooseUs />
        <Separator />
        <WhoWeWorkWith />
        <Separator />
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  );
}



