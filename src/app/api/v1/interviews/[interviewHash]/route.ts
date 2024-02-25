import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getInterview } from "@/db/repositories/interviewRepository";

export async function GET(
  _request: NextRequest,
  { params }: { params: { interviewHash: string } }
) {
  const { userId: userAuthId } = auth();

  if (!userAuthId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = drizzle(sql);

    const interviews = await getInterview(db, params.interviewHash, userAuthId);

    if (interviews.length === 0) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...interviews[0].interviews });
  } catch (error) {
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
