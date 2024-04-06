import { auth, currentUser } from "@clerk/nextjs";
import Header from "@/components/DashboardHeader";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getOrganizationByExternalId } from "@/db/repositories/organizationRepository";
import { User } from "@/store/schemas";
import { getJobListings } from "@/db/repositories/jobListingRepository";
import { DashboardFooter } from "@/components/DashboardFooter";
import EmptyState from "@/components/EmptyState";
import JobListingCreator from "@/components/JobListingCreator";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default async function JobListingPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  async function createJobListing() {
    'use server'
    console.log("Creating job listing");
  }

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

  const jobListing = await getJobListings(organization.id);
  console.log(jobListing);

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
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Create Job Listings
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
                              Welcome
                            </p>
                            <p className="text-xl font-bold text-gray-600 sm:text-2xl">
                              {user.fullName}
                            </p>
                          </div>
                        </div>
                        {jobListing.length !== 0 && (
                          <div className="mt-5 flex justify-center sm:mt-0">
                            <button
                              type="button"
                              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Create Job Listing
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 col-span-6 gap-4 mt-2 shadow-md p-5">
                {jobListing.length === 0 && (
                  <EmptyState
                    title="No job listings created"
                    description="To start using interviewcrew, create a new job listing"
                    callToAction="New Job Listing"
                    creatorComponent={JobListingCreator}
                    organizationId={organization.id}
                    icon={
                      <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </>
  );
}
