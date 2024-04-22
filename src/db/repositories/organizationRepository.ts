import { drizzle } from "drizzle-orm/vercel-postgres";
import { organizationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { sql } from "@vercel/postgres";

export async function getOrganizationById(organizationId: number) {
  const db = drizzle(sql, { schema });

  return db.query.organizationsTable.findFirst({
    where: eq(organizationsTable.id, organizationId),
  });
}

export async function getOrganizationByExternalId(externalId: string) {
  const db = drizzle(sql, { schema });
  
  return db.query.organizationsTable.findFirst({
    where: eq(organizationsTable.externaleId, externalId),
  });
}
