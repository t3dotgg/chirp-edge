"use client";

// Importing anything from @clerk/nextjs on client appears to break edge due to buffer calls
import { useSignIn } from "@clerk/nextjs";

export const CustomSignIn = () => {
  const s = useSignIn();

  return <button onClick={() => null}>Sign In</button>;
};
