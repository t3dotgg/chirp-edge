import { currentUser, SignIn } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";
import { CreatePostWizard } from "./compose-topnav";
import { CustomSignIn } from "./signin";
import Tweets from "./tweets";

export const dynamic = "force-dynamic";

const Feed = async () => {
  const self = await currentUser();
  return (
    <div className="flex h-full w-full grow flex-col border-l border-r border-zinc-700 md:w-[600px]">
      {/* @ts-expect-error Server Component */}
      {self && <CreatePostWizard self={self} />}
      {!self && <CustomSignIn />}
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <Tweets />
      </Suspense>
    </div>
  );
};

const HomeFeed = () => {
  /* @ts-expect-error Server Component */
  return <Feed />;
};

export default HomeFeed;
