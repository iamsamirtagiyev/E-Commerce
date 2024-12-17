import { Response } from "express";

export const errorMessage = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Unknown error",
    });
  }
};
