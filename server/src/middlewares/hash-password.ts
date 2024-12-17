import { NextFunction, Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import bcrypt from "bcrypt";

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    next();
  } catch (error) {
    errorMessage(error, res);
  }
};
