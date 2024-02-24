import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getAssignment } from "@/db/repositories/assignmentRepository";

export async function GET(
  _request: NextRequest,
  { params }: { params: { assignmentHash: string } }
) {
  const { userId: userAuthId } = auth();

  if (!userAuthId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = drizzle(sql);

    const assignments = await getAssignment(
      db,
      params.assignmentHash,
      userAuthId
    );

    if (assignments.length === 0) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ assignment: assignments[0].assignments });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
