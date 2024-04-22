import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import Header from "@/components/DashboardHeader";
import { redirect } from "next/navigation";
import {
  createOrganization,
  getOrganizationByExternalId,
} from "@/db/repositories/organizationRepository";
import { User } from "@/store/schemas";
import { getJobListings } from "@/db/repositories/jobListingRepository";
import { DashboardFooter } from "@/components/DashboardFooter";
import EmptyState from "@/components/EmptyState";
import JobListingManager from "@/components/JobListingManager";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import JobListingsList from "@/components/JobListingsList";
import {
  createUser,
  getUserByExternalId,
} from "@/db/repositories/userRepository";
import { getUpdatedSearchParams } from "@/lib/utils";
import { getCandidates } from "@/db/repositories/candidateRepository";

export default async function JobListingPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loadedUser = await currentUser();
  const { orgId: organizationExternalId, sessionId } = auth();

  if (!organizationExternalId || !loadedUser) {
    return redirect("/login");
  }

  let organization = await getOrganizationByExternalId(organizationExternalId);

  if (!organization) {
    const clerkOrganization = await clerkClient.organizations.getOrganization({
      organizationId: organizationExternalId,
    });

    organization = await createOrganization({
      externalId: organizationExternalId,
      name: clerkOrganization.name,
      slug: clerkOrganization.slug ?? clerkOrganization.name,
    });
  }

  let loggedInUser = await getUserByExternalId(loadedUser.id);

  if (!loggedInUser) {
    loggedInUser = await createUser({
      externalId: loadedUser.id,
      organizationId: organization.id,
    });
  }

  const jobListings = await getJobListings(organization.id);
  const jobListing = jobListings.find(
    (jobListing) => String(jobListing.id) === searchParams["jobListingId"]
  );

  if (!jobListing && searchParams["jobListingId"]) {
    return redirect(
      "/dashboard/job-listings" +
        getUpdatedSearchParams(searchParams, [
          { key: "jobListingId", value: undefined },
          { key: "step", value: undefined },
        ])
    );
  }

  const user: User = {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    imageUrl: loadedUser.imageUrl,
    primaryEmailAddress:
      loadedUser.emailAddresses.find(
        (email) => email.id == loadedUser.primaryEmailAddressId
      )?.emailAddress ?? "",
  };

  const allCandidates = await getCandidates(organization.id, "");

  // console.log(await clerkClient.sessions.getToken(sessionId, "long-term-token"))

  return (
    <>
      <div className="min-h-full">
        <Header user={user} current={"Job Listings"} showNaviation={true} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Create Job Listings</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-6">
              <div className="grid grid-cols-1 col-span-6 gap-4">
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow grid grid-cols-1 col-span-6 gap-4 p-10">
                    {searchParams["step"] ? (
                      <JobListingManager
                        organizationId={organization.id}
                        searchParams={searchParams}
                        userId={loggedInUser.id}
                        jobListing={jobListing}
                        allCandidates={allCandidates}
                      />
                    ) : jobListings.length === 0 ? (
                      <EmptyState
                        title="No job listings created"
                        description="To start using interviewcrew, create a new job listing"
                        callToAction="New Job Listing"
                        CreatorComponent={JobListingManager}
                        organizationId={organization.id}
                        searchParams={searchParams}
                        userId={loggedInUser.id}
                        icon={
                          <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                        }
                      />
                    ) : (
                      <JobListingsList
                        jobListings={jobListings}
                        searchParams={searchParams}
                      />
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </>
  );
}
