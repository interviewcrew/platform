import { NextRequest, NextResponse } from "next/server";

export async function OptionsHandler(_request: NextRequest) {
  return new NextResponse("", {
    status: 200,
  });
}
