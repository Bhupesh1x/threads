import mongoose from "mongoose";

const threasSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  threadImage: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: {
    type: String,
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threasSchema);

export default Thread;
