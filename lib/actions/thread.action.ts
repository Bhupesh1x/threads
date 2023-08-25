"use server";

import { revalidatePath } from "next/cache";
import Thread from "../model/thread.model";
import User from "../model/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    const createThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread?._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    const skipAmmount = (pageNumber - 1) * pageSize;

    const threadQuery = Thread.find({ parentId: { $in: [undefined, null] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image",
        },
      });

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [undefined, null] },
    });

    const threads = await threadQuery.exec();

    const isNext = totalThreadsCount > skipAmmount + threads.length;

    return { threads, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}
