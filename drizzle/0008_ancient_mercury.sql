ALTER TABLE "evaluations" ALTER COLUMN "evaluation_metric_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "evaluations" ADD COLUMN "value_formatted" text;--> statement-breakpoint
ALTER TABLE "evaluations" ADD COLUMN "question_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
