import Link from "next/link";

import { Logo } from "@/components/Logo";
import { SlimLayout } from "@/components/SlimLayout";
import { type Metadata } from "next";
import {
  CreateOrganization,
  OrganizationList,
  OrganizationSwitcher,
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

    let loggedInUser = await getUserByExternalId(loadedUser.id);

    if (!loggedInUser) {
      loggedInUser = await createUser({
        externalId: loadedUser.id,
        organizationId: organization.id,
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

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>
      {loadedUser && !organizationExternalId ? (
        <CreateOrganization
          afterCreateOrganizationUrl={`/dashboard/${organizationExternalId}`}
        />
      ) : (
        <div>
          {shouldChangeOrganization === "true" && <OrganizationList />}
        </div>
      )}
    </SlimLayout>
  );
}
