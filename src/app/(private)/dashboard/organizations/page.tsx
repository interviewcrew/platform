import Link from "next/link";

import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import { type Metadata } from "next";
import {
  CreateOrganization,
  OrganizationList,
  auth,
  clerkClient,
  currentUser,
} from "@clerk/nextjs";
import "@/app/(public)/(auth)/styles.css";
import { redirect } from "next/navigation";
import {
  createOrganization,
  getOrganizationByExternalId,
} from "@/db/repositories/organizationRepository";
import {
  createUser,
  getUserByExternalId,
  updateUser,
} from "@/db/repositories/userRepository";
import { Waitlist } from "@/components/Waitlist";

export const metadata: Metadata = {
  title: "Create organization",
};

export default async function OrganizationPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const loadedUser = await currentUser();

  const { orgId: organizationExternalId, sessionId } = auth();
  const shouldChangeOrganization = searchParams.shouldChangeOrganization;

  if (!loadedUser) {
    return redirect("/login");
  }

  const userData = {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    email:
      loadedUser.emailAddresses.find(
        (email) => email.id == loadedUser.primaryEmailAddressId
      )?.emailAddress ?? "",
  };

  let loggedInUser = await getUserByExternalId(loadedUser.id);

  if (!loggedInUser) {
    loggedInUser = await createUser({
      externalId: loadedUser.id,
    });
  }

  if (organizationExternalId) {
    if (shouldChangeOrganization !== "true") {
      return redirect("/dashboard");
    }

    let organization = await getOrganizationByExternalId(
      organizationExternalId
    );

    if (!organization) {
      const clerkOrganization = await clerkClient.organizations.getOrganization(
        {
          organizationId: organizationExternalId,
        }
      );

      organization = await createOrganization({
        externalId: organizationExternalId,
        name: clerkOrganization.name,
        slug: clerkOrganization.slug ?? clerkOrganization.name,
      });
    }

    if (loggedInUser.organizationId != organization.id) {
      await updateUser({
        ...loggedInUser,
        organizationId: organization.id,
      });

      return redirect("/dashboard");
    }
  }

  const organizations = await clerkClient.users.getOrganizationMembershipList({
    userId: loadedUser.id,
  });

  return (
    <SlimLayout>
      <div className="flex justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>
      {loadedUser &&
        organizationExternalId &&
        shouldChangeOrganization === "true" && <OrganizationList />}
      {loadedUser && loggedInUser.activatedAt && !organizationExternalId && (
        <CreateOrganization afterCreateOrganizationUrl={`/dashboard`} />
      )}
      {loadedUser && !loggedInUser.activatedAt && (
        <Waitlist
          user={loggedInUser}
          userData={userData}
          organizationId={organizations[0]?.organization.id}
        />
      )}
    </SlimLayout>
  );
}
