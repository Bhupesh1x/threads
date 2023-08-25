import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const results = await fetchThreads(1, 30);
  const user = await currentUser();
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-10 flex flex-col gap-10">
        {results.threads.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {results.threads.map((thread) => (
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
            ))}
          </>
        )}
      </section>
    </>
  );
}
