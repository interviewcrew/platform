import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { assignmentsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  Assignment,
  getAssignment,
  insertAssignment,
} from "@/db/repositories/assignmentRepository";
import { getCompany } from "@/db/repositories/companyRepository";

export async function POST(request: NextRequest) {
  const requestSchema = z.object({
    assignment: createInsertSchema(assignmentsTable).omit({
      id: true,
      problemId: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
    }),
  });

  const { userId: userAuthId } = auth();

  if (!userAuthId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestParsed: { assignment: Assignment };

  try {
    requestParsed = requestSchema.parse(await request.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unknown request validation error" },
      { status: 500 }
    );
  }

  try {
    const db = drizzle(sql);

    const company = await getCompany(db, userAuthId);

    if (company.length === 0) {
      return NextResponse.json(
        { error: "User doesn't belong to a company" },
        { status: 404 }
      );
    }

    const assignments = await getAssignment(
      db,
      requestParsed.assignment.hash,
      userAuthId
    );

    if (assignments.length > 0) {
      return NextResponse.json(
        { error: "Assignment already exists" },
        { status: 409 }
      );
    }

    insertAssignment(db, requestParsed.assignment, company[0].companies.id);

    return NextResponse.json({ status: "Successful" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
