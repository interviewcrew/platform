import { auth, currentUser } from "@clerk/nextjs";
import Header from "@/components/DashboardHeader";
import { redirect } from "next/navigation";
import { getOrganizationByExternalId } from "@/db/repositories/organizationRepository";
import {
  getInterviewByHashIdWithFields,
} from "@/db/repositories/interviewRepository";
import InterviewEvaluationDetails from "@/components/InterviewEvaluationDetails";
import { User } from "@/store/schemas";

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: { hashId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loadedUser = await currentUser();
  const { orgId: organizationExternalId } = auth();

  if (!organizationExternalId) {
    return redirect("/login");
  }

  const organization = await getOrganizationByExternalId(
    organizationExternalId
  );

  if (!loadedUser || !organization) {
    return redirect("/login");
  }

  const user: User = {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    imageUrl: loadedUser.imageUrl,
    primaryEmailAddress:
      loadedUser.emailAddresses.find(
        (email) => email.id == loadedUser.primaryEmailAddressId
      )?.emailAddress ?? "",
  };

  const interview = await getInterviewByHashIdWithFields(
    params.hashId,
    organization.id
  );

  if (!interview) {
    return redirect("/app/not-found");
  }


  return (
    <>
      <div className="min-h-full">
        <Header user={user} current={"Interviews"} showNaviation={true} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Interview</h1>
            <div className="grid grid-cols-1 col-span-3 tgap-4">
              <InterviewEvaluationDetails
                interview={interview}
                searchParams={{ ...searchParams }}
              />
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                build with ❤️ by interviewcrew.io - 2024 -
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
