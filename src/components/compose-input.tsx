"use client";

import classNames from "classnames";
// If you uncomment this, it will fail to build, because Next isn't a safe import?
// Some bloom-filter thing is failing to resolve buffer
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import useSWRMutation from "swr/mutation";

// Fetcher implementation.
// The extra argument will be passed via the `arg` property of the 2nd parameter.
// In the example below, `arg` will be `'my_token'`
async function createPost(url: string, { arg }: { arg: string }) {
  console.log("fetchin", arg);
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ content: arg }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const CreatePostInput = () => {
  const [content, setContent] = useState("");

  const router = useRouter();

  const { trigger, isMutating, data } = useSWRMutation(
    "/api/post",
    createPost,
    {
      onSuccess: (data) => {
        router.refresh();
        setContent("");
      },
    }
  );

  return (
    <input
      value={content}
      onChange={(e) => setContent(e.target.value)}
      disabled={isMutating || !!data}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          trigger(content);
        }
      }}
      className={classNames(
        "my-4 grow bg-transparent py-4 pr-20 text-xl outline-none",
        { "opacity-80": isMutating }
      )}
      placeholder="Type some emojis"
      autoFocus
    />
  );
};
