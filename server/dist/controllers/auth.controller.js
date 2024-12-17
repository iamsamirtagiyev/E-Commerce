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
exports.resetPassword = exports.verifyOtp = exports.forgetPassword = exports.deleteUser = exports.logout = exports.login = exports.register = void 0;
const error_message_1 = require("../utils/error-message");
const User_model_1 = __importDefault(require("../models/User.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const create_token_1 = require("../utils/create-token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const get_user_1 = require("../utils/get-user");
const send_mail_1 = require("../utils/send-mail");
const maxAge = 60 * 60 * 24 * 365;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password, avatar } = req.body;
        const existingUser = yield User_model_1.default.findOne({ email });
        if (existingUser) {
            throw new Error("This email is being used");
        }
        let result = {
            public_id: "",
            secure_url: "",
        };
        if (avatar) {
            result = yield cloudinary_1.default.uploader.upload(avatar, {
                folder: "avatar",
            });
        }
        const user = new User_model_1.default({
            fullname: `${first_name} ${last_name}`,
            email,
            password,
            avatar: {
                public_id: result === null || result === void 0 ? void 0 : result.public_id,
                url: result === null || result === void 0 ? void 0 : result.secure_url,
            },
        });
        if (user) {
            yield user.save();
            const token = (0, create_token_1.createToken)(user === null || user === void 0 ? void 0 : user._id, maxAge, res);
            res.status(201).json({
                success: true,
                message: "User create successfully",
                token,
            });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("User is not registered");
        }
        const comparePassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!comparePassword) {
            throw new Error("Email or password is incorrect");
        }
        const token = (0, create_token_1.createToken)(user === null || user === void 0 ? void 0 : user._id, maxAge, res);
        res.status(200).json({
            success: true,
            message: "User login successfully",
            token,
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logout successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.logout = logout;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        if (!user) {
            throw new Error("User not found");
        }
        if ((_a = user === null || user === void 0 ? void 0 : user.avatar) === null || _a === void 0 ? void 0 : _a.public_id) {
            yield cloudinary_1.default.uploader.destroy((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id);
        }
        yield User_model_1.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user._id);
        res.status(200).json({
            success: true,
            message: "User delete successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.deleteUser = deleteUser;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_model_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const code = Math.floor(Math.random() * 9999);
        yield (0, send_mail_1.sendEmail)(email, "Reset Password", code.toString());
        user.reset_otp = code;
        yield user.save();
        res.json({
            success: true,
            message: "Email sent successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.forgetPassword = forgetPassword;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp_code } = req.body;
        const user = yield User_model_1.default.findById(req.params.id);
        if (otp_code !== (user === null || user === void 0 ? void 0 : user.reset_otp)) {
            throw new Error("Wrong OTP Code");
        }
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.verifyOtp = verifyOtp;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const user = yield User_model_1.default.findById(req.params.id);
        if (user) {
            user.password = password;
            user.reset_otp = 0;
            yield user.save();
            res.status(200).json({
                success: true,
                message: "Password updated successfully",
            });
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.resetPassword = resetPassword;
