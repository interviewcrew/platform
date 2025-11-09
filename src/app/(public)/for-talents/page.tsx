import { Footer } from "@/components/HomepageFooter";
import { Header } from "@/components/HomepageHeader";
import { TalentsHero } from "@/components/TalentsHero";
import { JoinProcess } from "@/components/JoinProcess";
import { MatchingProcess } from "@/components/MatchingProcess";
import { TalentSuccessStories } from "@/components/TalentSuccessStories";
import { TalentsCTA } from "@/components/TalentsCTA";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserByExternalId } from "@/db/repositories/userRepository";

export default async function ForTalents() {
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
        <TalentsHero />
        <JoinProcess />
        <MatchingProcess />
        <TalentSuccessStories />
        <TalentsCTA />
      </main>
      <Footer />
    </>
  );
}


