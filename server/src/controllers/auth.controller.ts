import { Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import User from "../models/User.model";
import cloudinary from "../config/cloudinary";
import { createToken } from "../utils/create-token";
import bcrypt from "bcrypt";
import { getUserFromToken } from "../utils/get-user";
import { sendEmail } from "../utils/send-mail";

const maxAge = 60 * 60 * 24 * 365;

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, avatar } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This email is being used");
    }

    let result = {
      public_id: "",
      secure_url: "",
    };

    if (avatar) {
      result = await cloudinary.uploader.upload(avatar, {
        folder: "avatar",
      });
    }

    const user = new User({
      fullname: `${first_name} ${last_name}`,
      email,
      password,
      avatar: {
        public_id: result?.public_id,
        url: result?.secure_url,
      },
    });

    if (user) {
      await user.save();
      const token = createToken(user?._id, maxAge, res);

      res.status(201).json({
        success: true,
        message: "User create successfully",
        token,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User is not registered");
    }

    const comparePassword = await bcrypt.compare(password, user?.password);

    if (!comparePassword) {
      throw new Error("Email or password is incorrect");
    }

    const token = createToken(user?._id, maxAge, res);

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);

    if (!user) {
      throw new Error("User not found");
    }

    if (user?.avatar?.public_id) {
      await cloudinary.uploader.destroy(user?.avatar?.public_id);
    }

    await User.findByIdAndDelete(user?._id);

    res.status(200).json({
      success: true,
      message: "User delete successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const code = Math.floor(Math.random() * 9999);

    await sendEmail(email, "Reset Password", code.toString());

    user.reset_otp = code;
    await user.save();

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp_code } = req.body;
    const user = await User.findById(req.params.id);
    if (otp_code !== user?.reset_otp) {
      throw new Error("Wrong OTP Code");
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.password = password;
      user.reset_otp = 0;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};
