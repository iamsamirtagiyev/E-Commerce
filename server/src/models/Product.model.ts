import { model, Schema } from "mongoose";
import { ProductType } from "../types";

const productSchema: Schema<ProductType> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  raiting: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  images: [
    {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
  ],
  reviews: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, default: "" },
      raiting: { type: Number, default: 0 },
    },
  ],
});

export default model<ProductType>("Product", productSchema);
