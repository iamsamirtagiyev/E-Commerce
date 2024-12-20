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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const error_message_1 = require("../utils/error-message");
const get_user_1 = require("../utils/get-user");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, get_user_1.getUserFromToken)(req, res);
        if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
            next();
        }
        else {
            throw new Error("You are not an admin");
        }
    }
    catch (error) {
        (0, error_message_1.errorMessage)(error, res);
    }
});
exports.isAdmin = isAdmin;
