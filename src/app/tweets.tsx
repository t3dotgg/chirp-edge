import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const TweetView = (props: {
  tweet: {
    createdAt: string;
    content: string;
    id: string;
    user: { profileImageUrl: string; username: string };
  };
}) => {
  return (
    <div className="border-t border-zinc-700 p-4 shadow-lg">
      <Link href={`/post/${props.tweet.id}`}>
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
      </Link>
    </div>
  );
};

export default function Tweets() {
  const data = [] as any[];

  return (
    <>
      {data?.map((post) => (
        <TweetView key={post.id} tweet={post} />
      ))}
    </>
  );
}
