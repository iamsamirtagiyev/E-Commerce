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
exports.deleteUser = exports.allUsers = void 0;
const error_message_1 = require("../utils/error-message");
const User_model_1 = __importDefault(require("../models/User.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_model_1.default.find().select("-password");
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.allUsers = allUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_model_1.default.findById(req.params.id);
        if (user) {
            yield cloudinary_1.default.uploader.destroy((_a = user === null || user === void 0 ? void 0 : user.avatar) === null || _a === void 0 ? void 0 : _a.public_id);
            yield User_model_1.default.findByIdAndDelete(req.params.id);
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.deleteUser = deleteUser;
