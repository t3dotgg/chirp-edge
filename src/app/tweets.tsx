import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { dbconnection } from "./utils/db";
import { CreatePostWizard } from "./compose-topnav";
dayjs.extend(relativeTime);

type User = { username: string; profileImageUrl: string; id: string };

type TweetType = {
  createdAt: string;
  content: string;
  id: string;
  authorId: string;
};

export const TweetView = (props: { tweet: TweetType & { user: User } }) => {
  return (
    <div className="border-t border-zinc-700 p-4 shadow-lg">
      {/* <Link href={`/post/${props.tweet.id}`}> */}
      <div className="flex items-center">
        <img
          src={props.tweet.user.profileImageUrl}
          alt="Profile"
          className="h-14 w-14 rounded-full"
        />
        <div className="ml-3 flex flex-col text-2xl">
          <div className="text-base font-bold text-slate-300">
            <span>{`@${props.tweet.user.username}`}</span>
            <span className="font-thin">{` · ${dayjs(
              props.tweet.createdAt
            ).fromNow()}`}</span>
          </div>
          <div className="text-slate-300">{props.tweet.content}</div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

import { headers } from "next/headers";

export default async function Tweets() {
  const { rows } = await dbconnection.execute(
    "SELECT * FROM `emoji-twitter`.`Post` WHERE 1=1 ORDER BY `emoji-twitter`.`Post`.`createdAt` DESC"
  );

  const hs = headers();

  const ref = hs.get("referer");

  if (!ref) {
    throw new Error("no referer");
  }

  const data = rows as TweetType[];
  const userIds = data.map((post) => post.authorId);
  const users: User[] = await fetch(`${ref}/api/users`).then((res) =>
    res.json()
  );

  const posts = data.map((post) => ({
    ...post,
    user: users.find((user) => user.id === post.authorId)!,
  }));

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CreatePostWizard />
      {posts.map((post) => (
        <TweetView
          key={post.id}
          tweet={{
            ...post,
          }}
        />
      ))}
    </>
  );
}
