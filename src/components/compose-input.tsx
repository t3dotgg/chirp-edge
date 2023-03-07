"use client";

// If you uncomment this, it will fail to build, because Next isn't a safe import?
// Some bloom-filter thing is failing to resolve buffer
// import { useRouter } from "next/router";

import { useState } from "react";

import useSWRMutation from "swr/mutation";

// Fetcher implementation.
// The extra argument will be passed via the `arg` property of the 2nd parameter.
// In the example below, `arg` will be `'my_token'`
async function createPost(url: string, { arg }: { arg: string }) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ content: arg }),
  });
}

export const CreatePostInput = () => {
  const [content, setContent] = useState("");

  //   const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/post", createPost, {
    onSuccess: (data) => {
      setContent("");
      //   router.reload();
    },
  });

  return (
    <input
      value={content}
      onChange={(e) => setContent(e.target.value)}
      disabled={isMutating}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          trigger(content);
        }
      }}
      className="my-4 grow bg-transparent py-4 pr-20 text-xl outline-none"
      placeholder="Type some emojis"
      autoFocus
    />
  );

  //   return (
  //     <div className="absolute right-2 flex h-full flex-col justify-center">
  //       {!!content && <button onClick={() => null}>POST!</button>}
  //     </div>
  //   );
};
