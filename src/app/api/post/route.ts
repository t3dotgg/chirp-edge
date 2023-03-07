export const runtime = "nodejs";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("req", request);
  const user = getAuth(request as any);

  console.log("auth?", user);

  const userId = user.userId;

  if (!userId) {
    return new NextResponse("Not authorized", { status: 401 });
  }

  // TODO: Validate
  // TODO: Save to DB

  return new NextResponse("Hello, Next.js!");
}
