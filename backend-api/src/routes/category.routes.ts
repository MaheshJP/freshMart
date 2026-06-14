import express from "express";
import { getCategories, createCategory } from "../controllers/category.controller";
import { authenticate } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authenticate, createCategory);

export default router;