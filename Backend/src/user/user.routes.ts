import { Router } from "express";
import { login, registerUser } from "./user.controllers";

const router = Router();

router.post('/create', registerUser);
router.post('/login', login);

export default router;