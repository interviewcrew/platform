import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const organizationTable = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  externaleId: varchar("external_id", { length: 256 }).notNull().unique(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type Organization = typeof organizationTable.$inferSelect;
export type NewOrganization = typeof organizationTable.$inferInsert;

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  externalId: varchar("external_id", { length: 256 }).unique(),
  organizationId: integer("organization_id")
    .references(() => organizationTable.id, { onDelete: "cascade" })
    .notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const programmingLanguagesTable = pgTable("programming_languages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type ProgrammingLanguage = typeof programmingLanguagesTable.$inferSelect;
export type NewProgrammingLanguage =
  typeof programmingLanguagesTable.$inferInsert;

export const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  organizationId: integer("organiaztion_id").references(
    () => organizationTable.id,
    {
      onDelete: "cascade",
    }
  ),
});

export type Problem = typeof problemsTable.$inferSelect;
export type NewProblem = typeof problemsTable.$inferInsert;

export const interviewsTable = pgTable(
  "interviews",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    hash: varchar("hash", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
    organizationId: integer("organization_id")
      .references(() => organizationTable.id, { onDelete: "cascade" })
      .notNull(),
    problemId: integer("problem_id").references(() => problemsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      hashIndex: uniqueIndex("hash_index").on(table.hash),
    };
  }
);

export type Interview = typeof interviewsTable.$inferSelect;
export type NewInterview = typeof interviewsTable.$inferInsert;

export const submissionsTable = pgTable("submissions", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  result: text("result").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  interviewId: integer("interview_id")
    .references(() => interviewsTable.id, { onDelete: "cascade" })
    .notNull(),
  languageId: integer("language_id")
    .references(() => programmingLanguagesTable.id, { onDelete: "cascade" })
    .notNull(),
});

export type Submission = typeof submissionsTable.$inferSelect;
export type NewSubmission = typeof submissionsTable.$inferInsert;

export const transcriptionsTable = pgTable(
  "transcriptions",
  {
    id: serial("id").primaryKey(),
    speaker: varchar("speaker", { length: 256 }).notNull(),
    transcription: text("transcription").notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
    interviewId: integer("interview_id")
      .references(() => interviewsTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: integer("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    unq: uniqueIndex().on(table.interviewId, table.order, table.userId),
  })
);

export type Transcription = typeof transcriptionsTable.$inferSelect;
export type NewTranscription = typeof transcriptionsTable.$inferInsert;
