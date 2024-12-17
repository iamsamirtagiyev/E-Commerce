"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (error, res) => {
    if (error instanceof Error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: "Unknown error",
        });
    }
};
exports.errorMessage = errorMessage;
