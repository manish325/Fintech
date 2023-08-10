import express from "express";
import { authService } from "./auth.service";
import { loginValidators, signupValidators, otpValidators } from "./auth.validation";
export const authRouter = express.Router();

authRouter.post('/login', loginValidators, authService.login);
authRouter.post('/getOtp', otpValidators , authService.getOtp);
authRouter.post('/signup', signupValidators , authService.verifyOtp , authService.signup);
authRouter.post('/forgotPassword')



