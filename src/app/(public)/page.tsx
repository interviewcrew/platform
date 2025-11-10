import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Faqs } from "@/components/Faqs";
import { NetworkingWithoutNoise } from "@/components/NetworkingWithoutNoise";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserByExternalId } from "@/db/repositories/userRepository";

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
        <Separator />
        <HowItWorks />
        <Separator />
        <Faqs />
        <Separator />
        <NetworkingWithoutNoise />
        <Separator />
        <Testimonials />
        <Separator />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
