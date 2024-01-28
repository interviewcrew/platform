import { pgTable, serial, varchar, timestamp, integer, text, uniqueIndex } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"}).defaultNow(),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    authId: varchar("auth_id", { length: 256}),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
}, (table) => {
    return {
        authIdIndex: uniqueIndex('auth_id_index').on(table.authId)
    }
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const programming_languages = pgTable("programming_languages", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
});

export type ProgrammingLanguage = typeof programming_languages.$inferSelect;
export type NewProgrammingLanguage = typeof programming_languages.$inferInsert;

export const problems = pgTable("problems", {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 256}).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }),
});

export type Problem = typeof problems.$inferSelect;
export type NewProblem = typeof problems.$inferInsert;

export const assignments = pgTable("assignments", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256}).notNull(),
    hash: varchar("hash", { length: 256}).notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
    problemId: integer("problem_id").references(() => problems.id, { onDelete: "cascade" }).notNull(),
}, (table) => {
    return {
        hashIndex: uniqueIndex('hash_index').on(table.hash)
    };
});

export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = typeof assignments.$inferInsert;

export const submissions = pgTable("submissions", {
    id: serial("id").primaryKey(),
    code: text("code").notNull(),
    result: text("result").notNull(),
    createdAt: timestamp("created_at", {mode: "date"} ).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"} ).defaultNow(),
    assignmentId: integer("assignment_id").references(() => assignments.id, { onDelete: "cascade" }).notNull(),
    languageId: integer("language_id").references(() => programming_languages.id, { onDelete: "cascade" }).notNull(),
});
 
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;