import { Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import User from "../models/User.model";
import cloudinary from "../config/cloudinary";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await cloudinary.uploader.destroy(user?.avatar?.public_id);
      await User.findByIdAndDelete(req.params.id);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};
