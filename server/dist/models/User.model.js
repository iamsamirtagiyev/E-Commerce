"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    reset_otp: { type: Number },
    avatar: {
        public_id: { type: String, default: "" },
        secure_url: { type: String, default: "" },
    },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
