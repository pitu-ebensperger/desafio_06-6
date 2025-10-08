import { Router } from "express"

import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireCredentials } from "../middlewares/credentialMiddleware.js";

const router = Router()

router.post("/", requireCredentials, userController.register);
router.post("/login", requireCredentials, userController.login);
router.get("/", authMiddleware, userController.usuario);


export default router;