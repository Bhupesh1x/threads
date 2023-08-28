import Link from "next/link";
import Image from "next/image";

interface Props {
  id: string;
  content: string;
  currentUserId: string;
  parentId: string | null;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  content,
  currentUserId,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <article
      className={`${isComment ? "px-0 xs:px-7" : "rounded-xl bg-dark-2 p-7"} `}
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
            <Image
              src={author.image}
              alt="profile image"
              className="cursor-pointer rounded-full"
              fill
            />
          </Link>
          <div className="thread-card_bar" />
        </div>
        <div className="flex flex-col">
          <Link href={`/profile/${author.id}`} className="w-fit">
            <h4 className="cursor-pointer text-base-semibold text-light-1">
              {author.name}
            </h4>
          </Link>

          <p className="mt-2 text-small-regular text-light-2">{content}</p>

          <div className={`${isComment && "mb-6"} flex gap-3.5 mt-5`}>
            <Link href={`/thread/${id}`}>
              <Image
                src="/assets/reply.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </Link>
          </div>

          {isComment && comments?.length > 0 && (
            <Link
              href={`/thread/${id}`}
              className="mt-1 text-subtle-medium text-gray-1"
            >
              <p>{comments.length} replies</p>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
