"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    raiting: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    images: [
        {
            public_id: { type: String, required: true },
            secure_url: { type: String, required: true },
        },
    ],
    reviews: [
        {
            user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            comment: { type: String, required: true },
            raiting: { type: Number, default: 0 },
        },
    ],
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
