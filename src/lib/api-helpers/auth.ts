import { getUserByExternalId } from "@/db/repositories/userRepository";
import * as schema from "@/db/schema";
import {
  HTTPForbiddenError,
  HTTPNotFoundError,
} from "@/lib/api-helpers/error-handler";
import { getOrganizationById } from "@/db/repositories/organizationRepository";
import { User } from "@/db/schema";

export async function getUserWithErrorHandling(
  externalId: string
): Promise<schema.User> {
  const user = await getUserByExternalId(externalId);

  if (!user) {
    throw new HTTPNotFoundError("User not found");
  }

  return user;
}

export async function getUserOrganizationWithErrorHandling(
  user: User
): Promise<schema.Organization> {
  if (!user.organizationId) {
    throw new HTTPForbiddenError("User does not belong to an organization");
  }

  const organization = await getOrganizationById(user.organizationId);

  if (!organization) {
    throw new HTTPNotFoundError("Organization not found");
  }

  return organization;
}
