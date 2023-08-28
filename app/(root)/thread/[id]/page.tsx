import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative">
      <ThreadCard
        key={thread._id}
        id={thread._id}
        content={thread.text}
        currentUserId={user?.id || ""}
        parentId={thread.parentId}
        author={thread?.author}
        community={thread?.community}
        createdAt={thread?.createdAt}
        comments={thread?.comments}
      />

      <div>
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-5">
        {thread?.children?.map((childThread: any) => (
          <ThreadCard
            key={childThread._id}
            id={childThread._id}
            content={childThread.text}
            currentUserId={user?.id || ""}
            parentId={childThread.parentId}
            author={childThread?.author}
            community={childThread?.community}
            createdAt={childThread?.createdAt}
            comments={childThread?.comments}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
