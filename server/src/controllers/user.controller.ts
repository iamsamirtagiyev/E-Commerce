import { Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import { getUserFromToken } from "../utils/get-user";
import cloudinary from "../config/cloudinary";
import User from "../models/User.model";
import Product from "../models/Product.model";
import { BasketType } from "../types";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);

    let avatar: any = {};

    if (user) {
      if (req.body.avatar) {
        const result = await cloudinary.uploader.upload(req.body.avatar, { folder: "avatar" });
        avatar = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      } else {
        avatar = user?.avatar;
      }

      const updUser = await User.findByIdAndUpdate(user?._id, { ...req.body, avatar });

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updUser,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);

    if (user) {
      await Product.findByIdAndUpdate(req.params.id, { $push: { reviews: { ...req.body, user_id: user?._id } } });

      res.status(200).json({
        success: true,
        message: "Review sent successfully",
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const addBasket = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);
    if (user) {
      await User.findByIdAndUpdate(user?._id, {
        ...user,
        $push: {
          basket: {
            product_id: req.body.product_id,
            number: 1,
          },
        },
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const productCount = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);
    const product = await Product.findById(req.body.product_id);

    if (product) {
      if (req.query.status === "incremant" && req.body.count >= product?.stock) {
        await User.findByIdAndUpdate(user?._id, {
          basket: {
            product_id: product?._id,
            number: req.body.count,
          },
        });
      }

      if (req.query.status === "decrement" && req.body.count >= 0) {
        await User.findByIdAndUpdate(user?._id, {
          basket: {
            product_id: product?._id,
            number: req.body.count,
          },
        });
      }
      res.status(200).json({ success: true });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteBasket = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromToken(req, res);

    if (user) {
      if (user.basket) {
        const basket = user?.basket.filter((b: any) => b.product_id !== req.params.id) || [];
        await User.findByIdAndUpdate(user?._id, { ...user, basket });
        res.status(200).json({
          success: true,
        });
      }
    }
  } catch (error) {
    errorMessage(error, res);
  }
};
