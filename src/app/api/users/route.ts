import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 6000;

const filterUser = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export async function GET(request: Request) {
  const users = await clerkClient.users
    .getUserList()
    .then((u) => u.map(filterUser));

  return NextResponse.json(users);
}
