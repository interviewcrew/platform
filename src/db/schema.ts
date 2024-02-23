import { pgTable, serial, varchar, timestamp, integer, text, uniqueIndex } from "drizzle-orm/pg-core";

export const companiesTable = pgTable("companies", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"}).defaultNow(),
});

export type Company = typeof companiesTable.$inferSelect;
export type NewCompany = typeof companiesTable.$inferInsert;

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    authId: varchar("auth_id", { length: 256}),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companiesTable.id, { onDelete: "cascade" }).notNull(),
}, (table) => {
    return {
        authIdIndex: uniqueIndex('auth_id_index').on(table.authId)
    }
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const programmingLanguagesTable = pgTable("programming_languages", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
});

export type ProgrammingLanguage = typeof programmingLanguagesTable.$inferSelect;
export type NewProgrammingLanguage = typeof programmingLanguagesTable.$inferInsert;

export const problemsTable = pgTable("problems", {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 256}).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companiesTable.id, { onDelete: "cascade" }),
});

export type Problem = typeof problemsTable.$inferSelect;
export type NewProblem = typeof problemsTable.$inferInsert;

export const assignmentsTable = pgTable("assignments", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256}).notNull(),
    hash: varchar("hash", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companiesTable.id, { onDelete: "cascade" }).notNull(),
    problemId: integer("problem_id").references(() => problemsTable.id, { onDelete: "cascade" }).notNull(),
}, (table) => {
    return {
        hashIndex: uniqueIndex('hash_index').on(table.hash)
    };
});

export type Assignment = typeof assignmentsTable.$inferSelect;
export type NewAssignment = typeof assignmentsTable.$inferInsert;

export const submissionsTable = pgTable("submissions", {
    id: serial("id").primaryKey(),
    code: text("code").notNull(),
    result: text("result").notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    assignmentId: integer("assignment_id").references(() => assignmentsTable.id, { onDelete: "cascade" }).notNull(),
    languageId: integer("language_id").references(() => programmingLanguagesTable.id, { onDelete: "cascade" }).notNull(),
});
 
export type Submission = typeof submissionsTable.$inferSelect;
export type NewSubmission = typeof submissionsTable.$inferInsert;

export const transcriptionsTable = pgTable("transcriptions", {
    id: serial("id").primaryKey(),
    speacker: varchar("speaker", { length: 256}).notNull(),
    transcription: text("transcription").notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    assignmentId: integer("assignment_id").references(() => assignmentsTable.id, { onDelete: "cascade" }).notNull(),
});

export type Transcription = typeof transcriptionsTable.$inferSelect;
export type NewTranscription = typeof transcriptionsTable.$inferInsert;