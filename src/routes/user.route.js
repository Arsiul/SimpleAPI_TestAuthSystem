import { userController } from '../controllers/user.controller.js';
import Router from 'express';

const router = Router();

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/users", userController.getAllUsers);

export default router;