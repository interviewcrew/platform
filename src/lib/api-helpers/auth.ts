import { getUserByExternalId } from "@/db/repositories/userRepository";
import * as schema from "@/db/schema";
import { HTTPNotFoundError } from "@/lib/api-helpers/error-handler";
import { getOrganizationById } from "@/db/repositories/organizationRepository";

export async function getUserWithErrorHandling(
  externalId: string
): Promise<schema.User> {
    const user = await getUserByExternalId(externalId);

    if (!user) {
        throw new HTTPNotFoundError("User not found");
    }

    return user;
}

export async function getOrganizationWithErrorHandling(
  organiaztionId: number 
): Promise<schema.Organization> {
    const organization = await getOrganizationById(organiaztionId);

    if (!organization) {
        throw new HTTPNotFoundError("Organization not found");
    }

    return organization;
}