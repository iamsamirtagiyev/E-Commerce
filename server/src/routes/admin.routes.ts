import { Router } from "express";
import { allUsers, deleteUser } from "../controllers/admin.controller";

const router = Router();

router.get("/all", allUsers);
router.delete("/:id", deleteUser);

export default router;
