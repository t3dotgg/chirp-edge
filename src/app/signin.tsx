"use client";

// Importing anything from @clerk/nextjs on client appears to break edge due to buffer calls
import { useClerk } from "@clerk/nextjs/app-beta/client";

export const CustomSignIn = () => {
  const { openSignIn } = useClerk();

  return <button onClick={() => openSignIn()}>Sign In</button>;
};
