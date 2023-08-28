import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo?._id);
  return (
    <section>
      <h1 className="head-text">Activity</h1>

      <div className="flex flex-col gap-5 mt-10">
        {activities.length === 0 ? (
          <p className="no-result">No activity yet.</p>
        ) : (
          activities.map((activity) => (
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
              <article className="activity-card">
                <Image
                  src={activity.author?.image}
                  alt=""
                  height={20}
                  width={20}
                  className="rounded-full object-cover"
                />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {activity.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default page;
