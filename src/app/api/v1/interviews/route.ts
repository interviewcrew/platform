import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { interviewsTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  Interview,
  getInterview,
  insertInterview,
} from "@/db/repositories/interviewRepository";
import { getOrganization } from "@/db/repositories/organizationRepository";

export async function POST(request: NextRequest) {
  const requestSchema = createInsertSchema(interviewsTable).omit({
    id: true,
    problemId: true,
    organizationId: true,
    createdAt: true,
    updatedAt: true,
  });

  const { userId: userAuthId } = auth();

  if (!userAuthId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let interviewParams: Interview;

  try {
    interviewParams = requestSchema.parse(await request.json());
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

    const organization = await getOrganization(db, userAuthId);

    if (organization.length === 0) {
      return NextResponse.json(
        { error: "User doesn't belong to a organization" },
        { status: 404 }
      );
    }

    const interviews = await getInterview(db, interviewParams.hash, userAuthId);

    if (interviews.length > 0) {
      return NextResponse.json(
        { ...interviews[0].interviews },
        { status: 200 }
      );
    }

    const interview = await insertInterview(
      db,
      interviewParams,
      organization[0].organizations.id
    );

    return NextResponse.json({ ...interview[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
