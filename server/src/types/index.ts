import { JwtPayload } from "jsonwebtoken";
import { Document, Schema } from "mongoose";

export interface ImageType {
  public_id: string;
  secure_url: string;
}

export interface UserType extends Document {
  fullname: string;
  email: string;
  password: string;
  avatar: ImageType;
  reset_otp?: number;
}

export interface ReviewType {
  user_id: Schema.Types.ObjectId;
  comment: string;
  raiting: number;
}

export interface ProductType extends Document {
  name: string;
  description: string;
  price: number;
  images: ImageType[];
  raiting: number;
  reviews: ReviewType[];
  stock: number;
}

export interface CustomRequest extends Request {
  cookies: any;
  user?: JwtPayload | string;
}
