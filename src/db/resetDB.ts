import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  organizationsTable,
  usersTable,
  problemsTable,
  programmingLanguagesTable,
  languagesTable,
  evaluationMetricsTable,
} from "@/db/schema";
import { supportedLangs } from "@/app/supportedIDEConfigs";
import dotenv from "dotenv";
import * as schema from "@/db/schema";

dotenv.config({ path: ".env.local" });

async function resetDB(): Promise<void> {
  const db = drizzle(sql, { schema });

  if (process.env.NODE_ENV === "production") {
    throw new Error("Resetting the database is not allowed in production");
  }
  
  // Deletion happens in cascade
  await db.delete(organizationsTable);
  await db.delete(programmingLanguagesTable);
  await db.delete(languagesTable);
  await db.delete(evaluationMetricsTable);

  await db
    .insert(programmingLanguagesTable)
    .values(
      supportedLangs.map((lang) => ({ id: lang.id, name: lang.language }))
    );

  await db
    .insert(languagesTable)
    .values({
      name: "English",
    })
    .returning({ id: languagesTable.id, name: languagesTable.name });

}

resetDB().then(() => {
  console.log("Database reset");
});
