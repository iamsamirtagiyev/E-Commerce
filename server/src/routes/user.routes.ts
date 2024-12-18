import { Router } from "express";
import { addBasket, addReview, deleteBasket, productCount, updateUser } from "../controllers/user.controller";

const router = Router();

router.patch("/update", updateUser);
router.post("/review/:id", addReview);
router.post("/basket", addBasket);
router.post("/", productCount);
router.delete("/basket/:id", deleteBasket);

export default router;
