import { currentUser, SignIn } from "@clerk/nextjs/app-beta";

export const CreatePostWizard = async () => {
  //   const [content, setContent] = useState("");

  const content = "";

  const setContent = (i: string) => null;

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
      <input
        value={content}
        // onChange={(e) => setContent(e.target.value)}
        disabled={true}
        className="my-4 grow bg-transparent py-4 pr-20 text-xl outline-none"
        placeholder="Type some emojis"
        autoFocus
      />
      <div className="absolute right-2 flex h-full flex-col justify-center">
        {!!content && <button onClick={() => null}>POST!</button>}
      </div>
    </div>
  );
};
