import mongoose from "mongoose";

let isConnected = false;

//HSGRl66fJGLTdsTw

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MongoDB url not found!");
  if (isConnected) return console.log("Already connected to the MongoDB!");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
}
