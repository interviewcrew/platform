import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { Testimonials } from "@/components/Testimonials";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserByExternalId } from "@/db/repositories/userRepository";
import People from "@/components/team";

export default async function Home() {
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
        <PrimaryFeatures />
        <SecondaryFeatures />
        <People />
        <CallToAction />
        <Testimonials />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
