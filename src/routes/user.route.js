import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from 'myauthsystem';
import Router from 'express';

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/users", authMiddleware(process.env.SECRET_KEY), userController.getAllUsers);

export default router;