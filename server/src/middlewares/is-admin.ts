import { NextFunction, Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import { getUserFromToken } from "../utils/get-user";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserFromToken(req, res);

    if (user?.role === "admin") {
      next();
    } else {
      throw new Error("You are not an admin");
    }
  } catch (error) {
    errorMessage(error, res);
  }
};
