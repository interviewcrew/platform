import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { Hero } from "@/components/Hero";
import { ExceptionalLeaders } from "@/components/ExceptionalLeaders";
import { HumanNetworking } from "@/components/HumanNetworking";
import { HowItWorks } from "@/components/HowItWorks";
import { Faqs } from "@/components/Faqs";
import { NetworkingWithoutNoise } from "@/components/NetworkingWithoutNoise";
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
        <Hero />
        <ExceptionalLeaders />
        <HumanNetworking />
        <HowItWorks />
        <Faqs />
        <NetworkingWithoutNoise />
      </main>
      <Footer />
    </>
  );
}



