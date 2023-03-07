import { currentUser, SignIn } from "@clerk/nextjs/app-beta";
import { CreatePostInput } from "~/components/compose-input";

export const CreatePostWizard = async () => {
  const user = await currentUser();

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="relative flex w-full">
      <img
        src={user?.profileImageUrl}
        alt="Profile"
        className="m-4 h-14 w-14 rounded-full"
      />
      <CreatePostInput />
    </div>
  );
};
