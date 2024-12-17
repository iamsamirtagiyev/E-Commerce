"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, maxAge, res) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: maxAge * 1000 });
    res.cookie("token", token, {
        maxAge: maxAge,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    return token;
};
exports.createToken = createToken;
