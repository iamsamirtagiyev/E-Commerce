import { Response } from "express";
import jwt from "jsonwebtoken";

export const createToken = (id: any, maxAge: number, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: maxAge * 1000 });
  res.cookie("token", token, {
    maxAge: maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return token;
};
