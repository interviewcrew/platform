import { getUserByExternalId } from "@/db/repositories/userRepository";
import * as schema from "@/db/schema";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { HTTPNotFoundError } from "@/lib/api-helpers/error-handler";
import { getOrganizationById } from "@/db/repositories/organizationRepository";

export async function getUserWithErrorHandling(
  db: VercelPgDatabase<typeof schema>,
  externalId: string
): Promise<schema.User> {
    const user = await getUserByExternalId(db, externalId);

    if (!user) {
        throw new HTTPNotFoundError("User not found");
    }

    return user;
}

export async function getOrganizationWithErrorHandling(
  db: VercelPgDatabase<typeof schema>,
  organiaztionId: number 
): Promise<schema.Organization> {
    const organization = await getOrganizationById(db, organiaztionId);

    if (!organization) {
        throw new HTTPNotFoundError("Organization not found");
    }

    return organization;
}