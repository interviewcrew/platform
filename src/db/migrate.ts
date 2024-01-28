import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

async function runMigration() {
  if (!process.env.POSTGRES_DATABASE) {
    throw new Error("POSTGRES_DATABASE is not set");
  }

  const db = drizzle(sql);

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./drizzle" });
  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

runMigration().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
