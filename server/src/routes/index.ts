import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();

//Auth
router.post("/auth/login", AuthController.login);

export default router;
