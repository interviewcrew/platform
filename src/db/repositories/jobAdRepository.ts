import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { jobAdsTable, NewJobAd } from "@/db/schema";
import * as schema from "@/db/schema";

export async function insertJobAd(
  db: VercelPgDatabase<typeof schema>,
  jobAd: NewJobAd
) {
  return await db
    .insert(jobAdsTable)
    .values(jobAd)
    .onConflictDoNothing()
    .returning({
      id: jobAdsTable.id,
      title: jobAdsTable.title,
      description: jobAdsTable.description,
      organizationId: jobAdsTable.organizationId,
      position: jobAdsTable.position,
      seniority: jobAdsTable.seniority,
    });
}
