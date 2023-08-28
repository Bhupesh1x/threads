import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Image
          src={imgUrl}
          height={60}
          width={60}
          alt="Profile Image"
          className="object-cover rounded-full shadow-md"
        />
        <div>
          <h3 className="text-base-semibold text-light-1">{name}</h3>
          <p className="text-gray-1 text-base-medium">@{username}</p>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-6 h-0.5 w-full bg-dark-3" />
    </>
  );
}
export default ProfileHeader;
