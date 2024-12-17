import { model, Schema } from "mongoose";
import { UserType } from "../types";

const userSchema: Schema<UserType> = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reset_otp: { type: Number },
  avatar: {
    public_id: { type: String, default: "" },
    secure_url: { type: String, default: "" },
  },
});

export default model<UserType>("User", userSchema);
