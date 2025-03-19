import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get([authMiddleware], getAllUsers);
router.route("/messages/:_id").get([authMiddleware], getMessages);

export default router;
