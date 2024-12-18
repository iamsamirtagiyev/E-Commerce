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
exports.deleteBasket = exports.productCount = exports.addBasket = exports.addReview = exports.updateUser = void 0;
const error_message_1 = require("../utils/error-message");
const get_user_1 = require("../utils/get-user");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const User_model_1 = __importDefault(require("../models/User.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        let avatar = {};
        if (user) {
            if (req.body.avatar) {
                const result = yield cloudinary_1.default.uploader.upload(req.body.avatar, { folder: "avatar" });
                avatar = {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                };
            }
            else {
                avatar = user === null || user === void 0 ? void 0 : user.avatar;
            }
            const updUser = yield User_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, Object.assign(Object.assign({}, req.body), { avatar }));
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: updUser,
            });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.updateUser = updateUser;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        if (user) {
            yield Product_model_1.default.findByIdAndUpdate(req.params.id, { $push: { reviews: Object.assign(Object.assign({}, req.body), { user_id: user === null || user === void 0 ? void 0 : user._id }) } });
            res.status(200).json({
                success: true,
                message: "Review sent successfully",
            });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.addReview = addReview;
const addBasket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        if (user) {
            yield User_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, Object.assign(Object.assign({}, user), { $push: {
                    basket: {
                        product_id: req.body.product_id,
                        number: 1,
                    },
                } }));
            res.status(200).json({ success: true });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.addBasket = addBasket;
const productCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        const product = yield Product_model_1.default.findById(req.body.product_id);
        if (product) {
            if (req.query.status === "incremant" && req.body.count >= (product === null || product === void 0 ? void 0 : product.stock)) {
                yield User_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                    basket: {
                        product_id: product === null || product === void 0 ? void 0 : product._id,
                        number: req.body.count,
                    },
                });
            }
            if (req.query.status === "decrement" && req.body.count >= 0) {
                yield User_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
                    basket: {
                        product_id: product === null || product === void 0 ? void 0 : product._id,
                        number: req.body.count,
                    },
                });
            }
            res.status(200).json({ success: true });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.productCount = productCount;
const deleteBasket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        if (user) {
            if (user.basket) {
                const basket = (user === null || user === void 0 ? void 0 : user.basket.filter((b) => b.product_id !== req.params.id)) || [];
                yield User_model_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, Object.assign(Object.assign({}, user), { basket }));
                res.status(200).json({
                    success: true,
                });
            }
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.deleteBasket = deleteBasket;
