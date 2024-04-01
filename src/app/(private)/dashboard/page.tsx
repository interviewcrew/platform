import { auth, currentUser } from "@clerk/nextjs";
import Header from "@/components/DashboardHeader";
import Image from "next/image";
import { redirect } from "next/navigation";
import InterviewList from "@/components/InterviewList";
import { getOrganizationByExternalId } from "@/db/repositories/organizationRepository";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "@/db/schema";
import { getAllInterviews, getInterviewByHashId } from "@/db/repositories/interviewRepository";
import { cn, getUpdatedSearchParams } from "@/lib/utils";
import InterviewDetails from "@/components/interviewDetails";
import Link from "next/link";

export interface User {
  fullName: string;
  imageUrl: string;
  primaryEmailAddress: string;
}


export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loadedUser = await currentUser();
  const { orgId: organizationExternalId } = auth();
  const db = drizzle(sql, { schema });

  if (!organizationExternalId) {
    return redirect("/login");
  }

  const organization = await getOrganizationByExternalId(
    db,
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

  const allInterviews = await getAllInterviews(db, organization.id);
  const doneInterviews = allInterviews.filter(
    (interview) => interview.transcriptions.length > 0
  );
  const upcomingInterviews = allInterviews.filter(
    (interview) => interview.transcriptions.length == 0
  );

  let interview = null;

  if (searchParams.interviewId && typeof searchParams.interviewId === "string") {
    interview = allInterviews.filter((interview) => interview.id == Number(searchParams.interviewId))[0];
  }

  const status = searchParams?.status ?? "all";

  const stats = [
    { label: "All", value: allInterviews, isActive: status === "all" },
    {
      label: "Done",
      value: doneInterviews,
      isActive: status === "done",
    },
    {
      label: "Upcoming",
      value: upcomingInterviews,
      isActive: status === "upcoming",
    },
  ];

  return (
    <>
      <div className="min-h-full">
        <Header user={user} current={"Interviews"} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Interviews</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
              {/* Left column */}
              <div className="grid grid-cols-1 col-span-2 gap-4">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Interviews status
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <Image
                              className="mx-auto h-20 w-20 rounded-full"
                              src={user.imageUrl ?? ""}
                              alt=""
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">
                              Welcome back,
                            </p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                              {user.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                          <button
                            type="button"
                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Create Interview
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {stats.map((stat) => (
                        <Link
                          key={stat.label}
                          className={cn(
                            "px-6 py-5 text-center text-sm font-medium",
                            {
                              "bg-gray-200": stat.isActive,
                            }
                          )}
                          href={getUpdatedSearchParams(
                            {},
                            "status",
                            stat.label.toLowerCase()
                          )}
                        >
                          <span className="text-gray-900">{stat.label}:</span>{" "}
                          <span className="text-gray-600">
                            {stat.value.length}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Actions panel */}
                <section aria-labelledby="quick-links-title">
                  <div className="rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="quick-links-title">
                      Interview List
                    </h2>
                    <InterviewList
                      interviews={
                        stats.filter((stat) => stat.isActive)[0].value
                      }
                      searchParams={{ ...searchParams }}
                    />
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 col-span-3 tgap-4">
                <InterviewDetails interview={interview} searchParams={{}} />
              </div>
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
