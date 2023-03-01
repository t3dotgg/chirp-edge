import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { dbconnection } from "./utils/db";
dayjs.extend(relativeTime);

type TweetType = {
  createdAt: string;
  content: string;
  id: string;
  user: { profileImageUrl: string; username: string };
};

export const TweetView = (props: { tweet: TweetType }) => {
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

export default async function Tweets() {
  const { rows } = await dbconnection.execute(
    "SELECT * FROM `emoji-twitter`.`Post` WHERE 1=1 ORDER BY `emoji-twitter`.`Post`.`createdAt` DESC"
  );

  const data = rows as TweetType[];

  return (
    <>
      {data.map((post) => (
        <TweetView
          key={post.id}
          tweet={{
            ...post,
            user: {
              profileImageUrl:
                "https://images.clerk.dev/oauth_github/img_2MLjBpO7qo5bS6be8EtgQfj8Iir.png",
              username: "theo",
            },
          }}
        />
      ))}
    </>
  );
}