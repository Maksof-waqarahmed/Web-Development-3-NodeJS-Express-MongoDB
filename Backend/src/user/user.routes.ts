import { Router } from "express";
import { login, registerUser, verifyEmail, getAllUsers, getById, updateUser, deleteUser } from "./user.controllers";
import { authMiddleware } from "../helpers/auth";

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.get('/all', authMiddleware, getAllUsers);
router.get('/get/:id', authMiddleware, getById);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

export default router;