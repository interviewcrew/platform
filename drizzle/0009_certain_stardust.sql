ALTER TABLE "users" ALTER COLUMN "organization_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "activated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "linkedin_link" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "registration_reason" varchar;