"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_config_1 = require("./config/db.config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const is_admin_1 = require("./middlewares/is-admin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
(0, db_config_1.db)();
const port = process.env.PORT || 3000;
app.get("/", (_req, res) => res.send("Hello Server"));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/admin", is_admin_1.isAdmin, admin_routes_1.default);
app.listen(port, () => console.log("Server is running on port -> " + port));
