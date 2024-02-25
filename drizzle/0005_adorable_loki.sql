ALTER TABLE "assignments" RENAME TO "interviews";--> statement-breakpoint
ALTER TABLE "companies" RENAME TO "organizations";--> statement-breakpoint
ALTER TABLE "problems" RENAME COLUMN "company_id" TO "organiaztion_id";--> statement-breakpoint
ALTER TABLE "submissions" RENAME COLUMN "assignment_id" TO "interview_id";--> statement-breakpoint
ALTER TABLE "transcriptions" RENAME COLUMN "assignment_id" TO "interview_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "company_id" TO "organization_id";--> statement-breakpoint
ALTER TABLE "interviews" RENAME COLUMN "company_id" TO "organization_id";--> statement-breakpoint
ALTER TABLE "problems" DROP CONSTRAINT "problems_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "transcriptions" DROP CONSTRAINT "transcriptions_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "interviews" DROP CONSTRAINT "assignments_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "interviews" DROP CONSTRAINT "assignments_problem_id_problems_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "transcriptions_assignment_id_order_user_id_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "transcriptions_interview_id_order_user_id_index" ON "transcriptions" ("interview_id","order","user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "problems" ADD CONSTRAINT "problems_organiaztion_id_organizations_id_fk" FOREIGN KEY ("organiaztion_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transcriptions" ADD CONSTRAINT "transcriptions_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
