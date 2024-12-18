"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    reset_otp: { type: Number },
    avatar: {
        public_id: { type: String, default: "" },
        secure_url: { type: String, default: "" },
    },
    basket: [
        {
            product_id: { type: mongoose_1.Schema.Types.ObjectId },
            number: { type: Number },
        },
    ],
});
exports.default = (0, mongoose_1.model)("User", userSchema);
