"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const error_message_1 = require("../utils/error-message");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, images } = req.body;
        let allImages = [];
        for (let i = 0; i < images.length; i++) {
            const result = yield cloudinary_1.default.uploader.upload(images[0], { folder: "products" });
            allImages.push({
                public_id: result === null || result === void 0 ? void 0 : result.public_id,
                secure_url: result === null || result === void 0 ? void 0 : result.secure_url,
            });
        }
        const product = new Product_model_1.default({ name, description, price, stock, images: allImages });
        if (product) {
            yield product.save();
            res.status(201).json({
                success: true,
                message: "Produce created successfully",
                product,
            });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let allImages = [];
        const product = yield Product_model_1.default.findById(req.params.id);
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.images) {
            for (let i = 0; i < ((_b = req.body) === null || _b === void 0 ? void 0 : _b.images.length); i++) {
                const result = yield cloudinary_1.default.uploader.upload((_c = req.body) === null || _c === void 0 ? void 0 : _c.images[0], { folder: "products" });
                allImages.push({
                    public_id: result === null || result === void 0 ? void 0 : result.public_id,
                    secure_url: result === null || result === void 0 ? void 0 : result.secure_url,
                });
            }
        }
        else {
            if (product) {
                allImages = product === null || product === void 0 ? void 0 : product.images;
            }
        }
        yield Product_model_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { images: allImages }));
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_model_1.default.findById(req.params.id);
        if (!product) {
            throw new Error("Product not found");
        }
        for (let i = 0; i < (product === null || product === void 0 ? void 0 : product.images.length); i++) {
            cloudinary_1.default.uploader.destroy(product === null || product === void 0 ? void 0 : product.images[i].public_id);
        }
        yield Product_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product delete successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.deleteProduct = deleteProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        const filter = {};
        if (category) {
            filter.category = { $regex: new RegExp(String(category), "i") };
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const total = yield Product_model_1.default.countDocuments(filter);
        const products = yield Product_model_1.default.find(filter).limit(limitNumber).skip(skip).populate("reviews.user_id", "_id name email avatar");
        res.status(200).json({
            success: true,
            products,
            total,
            page: pageNumber,
            pages: Math.ceil(total / limitNumber),
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.getProducts = getProducts;
