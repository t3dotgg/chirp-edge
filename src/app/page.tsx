import { Suspense } from "react";

// import Tweets from "./tweets";

const Feed = async () => {
  // const self = await currentUser();
  return (
    <div className="flex h-full w-full grow flex-col border-l border-r border-zinc-700 md:w-[600px]">
      {/* {self && <CreatePostWizard self={self} />} */}
      {/* {!self && <SignIn />} */}
      <Suspense fallback={<div>Loading...</div>}>{/* <Tweets /> */}</Suspense>
    </div>
  );
};

const HomeFeed = () => {
  /* @ts-expect-error Server Component */
  return <Feed />;
};

export default HomeFeed;
