"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.get("/all", admin_controller_1.allUsers);
router.delete("/:id", admin_controller_1.deleteUser);
exports.default = router;
