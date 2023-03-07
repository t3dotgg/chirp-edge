import { auth } from "@clerk/nextjs/app-beta";

export async function POST(request: Request) {
  const user = await auth();

  console.log("auth?", user);

  return new Response("Hello, Next.js!");
}
