import express from "express";
import { authService } from "./auth.service";
import { loginValidators, signupValidators } from "./auth.validation";
export const authRouter = express.Router();

authRouter.post('/login', loginValidators, authService.login);
authRouter.post('/signup', signupValidators , authService.signup);
authRouter.post('/forgotPassword')



