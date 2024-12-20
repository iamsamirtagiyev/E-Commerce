import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { isAdmin } from "../middlewares/is-admin";

const router = Router();

router.get("/", getProducts);
router.post("/new", isAdmin, createProduct);
router.patch("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
