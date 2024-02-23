CREATE TABLE IF NOT EXISTS "transcriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"speaker" varchar(256) NOT NULL,
	"transcription" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"assignment_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transcriptions" ADD CONSTRAINT "transcriptions_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
