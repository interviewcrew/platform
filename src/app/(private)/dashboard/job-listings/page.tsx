import { auth, currentUser } from "@clerk/nextjs";
import Header from "@/components/DashboardHeader";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getOrganizationByExternalId } from "@/db/repositories/organizationRepository";
import { User } from "@/store/schemas";
import { getJobListings } from "@/db/repositories/jobListingRepository";
import { DashboardFooter } from "@/components/DashboardFooter";
import EmptyState from "@/components/EmptyState";
import JobListingManager from "@/components/JobListingManager";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import JobListingsList from "@/components/JobListingsList";

export default async function JobListingPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loadedUser = await currentUser();
  const { orgId: organizationExternalId } = auth();

  if (!organizationExternalId) {
    console.log("OrganizationId not there", organizationExternalId);
    return redirect("/login");
  }

  const organization = await getOrganizationByExternalId(
    organizationExternalId
  );

  if (!loadedUser || !organization) {
    return redirect("/login");
  }

  const jobListings = await getJobListings(organization.id);

  const user: User = {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    imageUrl: loadedUser.imageUrl,
    primaryEmailAddress:
      loadedUser.emailAddresses.find(
        (email) => email.id == loadedUser.primaryEmailAddressId
      )?.emailAddress ?? "",
  };

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
                    {searchParams["step"] && searchParams["jobListingId"] ? (
                      <JobListingManager
                        organizationId={organization.id}
                        searchParams={searchParams}
                        jobListing={jobListings.find(
                          (jobListing) =>
                            String(jobListing.id) ===
                            searchParams["jobListingId"]
                        )}
                      />
                    ) : jobListings.length === 0 ? (
                      <EmptyState
                        title="No job listings created"
                        description="To start using interviewcrew, create a new job listing"
                        callToAction="New Job Listing"
                        creatorComponent={JobListingManager}
                        organizationId={organization.id}
                        searchParams={searchParams}
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
