import { connect } from "mongoose";

export const db = async () => {
  try {
    await connect(process.env.MONGO_DB || "");
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
  }
};
