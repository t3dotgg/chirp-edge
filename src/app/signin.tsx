"use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

export const CustomSignIn = () => {
  const { openSignIn } = useClerk();

  return <button onClick={() => openSignIn()}>Sign In</button>;
};
