import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get([authMiddleware], getAllUsers);

export default router;
