import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const organizationsTable = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  externaleId: varchar("external_id", { length: 256 }).notNull().unique(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const organizationsTableRelations = relations(
  organizationsTable,
  ({ many }) => ({
    users: many(usersTable),
    interviews: many(interviewsTable),
    problems: many(problemsTable),
  })
);

export type Organization = typeof organizationsTable.$inferSelect;
export type NewOrganization = typeof organizationsTable.$inferInsert;

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  externalId: varchar("external_id", { length: 256 }).unique(),
  organizationId: integer("organization_id")
    .references(() => organizationsTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const usersTableRelations = relations(usersTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [usersTable.organizationId],
    references: [organizationsTable.id],
  }),
  transcriptions: many(transcriptionsTable),
}));

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const programmingLanguagesTable = pgTable("programming_languages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type ProgrammingLanguage = typeof programmingLanguagesTable.$inferSelect;
export type NewProgrammingLanguage = typeof programmingLanguagesTable.$inferInsert;

export const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  organizationId: integer("organiaztion_id").references(
    () => organizationsTable.id,
    {
      onDelete: "cascade",
    }
  ),
});

export const problemsTableRelations = relations(problemsTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [problemsTable.organizationId],
    references: [organizationsTable.id],

  }),
  interviews: many(interviewsTable),
}));

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
      .references(() => organizationsTable.id, { onDelete: "cascade" })
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

export const interviewsTableRelations = relations(interviewsTable, ({ one, many }) => ({
  organization: one(organizationsTable, {
    fields: [interviewsTable.organizationId],
    references: [organizationsTable.id],
  }),
  problem: one(problemsTable, {
    fields: [interviewsTable.problemId],
    references: [problemsTable.id],
  }),
  submissions: many(submissionsTable),
  transcriptions: many(transcriptionsTable),
}));

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

export const submissionsTableRelations = relations(submissionsTable, ({ one }) => ({
  language: one(programmingLanguagesTable, {
    fields: [submissionsTable.languageId],
    references: [programmingLanguagesTable.id],
  }),
  interview: one(interviewsTable, {
    fields: [submissionsTable.interviewId],
    references: [interviewsTable.id],
  }),
}));

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

export const transcriptionsTableRelations = relations(transcriptionsTable, ({ one }) => ({
  interview: one(interviewsTable, {
    fields: [transcriptionsTable.interviewId],
    references: [interviewsTable.id],
  }),
  user: one(usersTable, {
    fields: [transcriptionsTable.userId],
    references: [usersTable.id],
  }),
}));

export type Transcription = typeof transcriptionsTable.$inferSelect;
export type NewTranscription = typeof transcriptionsTable.$inferInsert;
