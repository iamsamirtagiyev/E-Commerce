import "dotenv/config";
import { Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.model";

export const getUserFromToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("token not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    const user = User.findById(decoded?.id).select("-password");
    return user;
  } catch (error) {
    errorMessage(error, res);
  }
};
