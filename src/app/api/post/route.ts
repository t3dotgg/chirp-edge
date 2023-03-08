export const runtime = "nodejs";

import { getAuth } from "@clerk/nextjs/server";
import cuid2 from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbconnection } from "~/app/utils/db";

const PostSchema = z.object({
  content: z.string().emoji().max(280).min(1),
});

export async function POST(request: Request) {
  const user = getAuth(request as any);

  const userId = user.userId;

  if (!userId) {
    return new NextResponse("Not authorized", { status: 401 });
  }

  const body = await request.json();

  const parsed = PostSchema.safeParse(body);

  if (!parsed.success) {
    return new NextResponse("Invalid body", { status: 400 });
  }

  const { content } = parsed.data;

  const mysqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const insert = await dbconnection.execute(
      "INSERT INTO `emoji-twitter`.`Post` (`id`,`createdAt`,`content`,`published`,`authorId`) VALUES (?,?,?,?,?);",
      [cuid2.createId(), mysqlDate, content, true, userId]
    );

    console.log("successfully inserted new post", insert);

    return new NextResponse("success!");
  } catch (e) {
    console.log("error", e);
    return new NextResponse("error", { status: 500 });
  }
}
