import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { organizationTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export async function getOrganizationById(
  db: VercelPgDatabase<typeof schema>,
  organizationId: number 
) {
  return await db.query.organizationTable.findFirst({
    where: eq(organizationTable.id, organizationId),
  });
}

export async function getOrganizationByExternalId(
  db: VercelPgDatabase<typeof schema>,
  externalId: string
) {
  return await db.query.organizationTable.findFirst({
    where: eq(organizationTable.externaleId, externalId),
  });
}
