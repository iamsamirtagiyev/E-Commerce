import { Request, Response } from "express";
import { errorMessage } from "../utils/error-message";
import cloudinary from "../config/cloudinary";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, images } = req.body;

    let allImages = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[0], { folder: "products" });
      allImages.push({
        public_id: result?.public_id,
        secure_url: result?.secure_url,
      });
    }

    const product = new Product({ name, description, price, stock, images: allImages });

    if (product) {
      await product.save();
      res.status(201).json({
        success: true,
        message: "Produce created successfully",
        product,
      });
    }
  } catch (error) {
    errorMessage(error, res);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let allImages: any[] = [];
    const product = await Product.findById(req.params.id);

    if (req.body?.images) {
      for (let i = 0; i < req.body?.images.length; i++) {
        const result = await cloudinary.uploader.upload(req.body?.images[0], { folder: "products" });
        allImages.push({
          public_id: result?.public_id,
          secure_url: result?.secure_url,
        });
      }
    } else {
      if (product) {
        allImages = product?.images;
      }
    }

    await Product.findByIdAndUpdate(req.params.id, { ...req.body, images: allImages });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }

    for (let i = 0; i < product?.images.length; i++) {
      cloudinary.uploader.destroy(product?.images[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    errorMessage(error, res);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const filter: any = {};

    if (category) {
      filter.category = { $regex: new RegExp(String(category), "i") };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter).limit(limitNumber).skip(skip).populate("reviews.user_id", "_id name email avatar");

    res.status(200).json({
      success: true,
      products,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    errorMessage(error, res);
  }
};
