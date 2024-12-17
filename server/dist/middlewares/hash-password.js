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
exports.hashPassword = void 0;
const error_message_1 = require("../utils/error-message");
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        req.body.password = hashPassword;
        next();
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.hashPassword = hashPassword;
