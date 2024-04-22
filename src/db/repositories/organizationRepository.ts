import { drizzle } from "drizzle-orm/vercel-postgres";
import { NewOrganization, Organization, organizationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function getOrganizationById(
  organizationId: number
): Promise<Organization | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.organizationsTable.findFirst({
    where: eq(organizationsTable.id, organizationId),
  });
}

export async function getOrganizationByExternalId(
  externalId: string
): Promise<Organization | undefined> {
  const db = drizzle(sql, { schema });

  return db.query.organizationsTable.findFirst({
    where: eq(organizationsTable.externalId, externalId),
  });
}

export async function createOrganization(
  organization: NewOrganization
): Promise<Organization> {
  const db = drizzle(sql, { schema });

  return (
    await db.insert(organizationsTable).values(organization).returning({
      id: organizationsTable.id,
      name: organizationsTable.name,
      externalId: organizationsTable.externalId,
      slug: organizationsTable.slug,
      createdAt: organizationsTable.createdAt,
      updatedAt: organizationsTable.updatedAt,
    })
  )[0];
}
