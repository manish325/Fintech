import { userModel } from "./auth.models";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IError, ILoginResponse } from "../../core/interfaces";
import { sign, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { ISignupUser, IUser } from "./auth.types";
import { Error, model } from "mongoose";
import { CustomApiError } from "../../error-handlers/exception-handler";
import { sendMail } from "../../utilities/mail.service";
import { generateOtp } from "../../utilities/otp.service";
import Cache from "memory-cache";


class AuthService {
    constructor() { }
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username: username, password: password });
            if (user) {
                //create token and send to FE
                const options: SignOptions = {
                    expiresIn: '1h'
                }
                const token = sign(user, process.env.SECRET_KEY || '', options);

                res.status(StatusCodes.OK).json({
                    token: token
                } as ILoginResponse);

            } else {
                const errorMessage: IError = {
                    message: 'Incorrect Username or Password!'
                }
                res.status(StatusCodes.FORBIDDEN).json(errorMessage);
            }
        } catch (e) {
            const errorMessage: IError = {
                message: 'Incorrect Username or Password!'
            }
            res.status(StatusCodes.FORBIDDEN).json(errorMessage);
        }
    }

    async getOtp(req : Request, res : Response) {
        const {email} = req.body;
        try {
            const otp = generateOtp();
            await sendMail(email, otp);
            Cache.put(email, otp, 5 * 60 * 1000);
            res.status(StatusCodes.OK).send({
                message: 'OTP Sent on email, kindly check!'
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async verifyOtp(req : Request, res : Response, next : NextFunction) {
        const {email, otp} = req.body;
        const storedOTP = Cache.get(email);
        if(storedOTP && otp===storedOTP) {
            next()
        } else {
            res.status(StatusCodes.FORBIDDEN).json({
                message : 'Invalid OTP'
            })
        }
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        const newUser: IUser = req.body;
        const [month, day, year] = (req.body.dateOfBirth as string).split('/').map(Number);
        newUser.dateOfBirth = new Date(year, month, day);
        console.log(newUser)
        try {
            const createdUser = userModel.create(newUser);
            console.log("User created successfully:", newUser);
                
        } catch (err) {
            if (err instanceof Error.ValidationError && err) {
                // Handle validation errors
                const validationErrors = {};
                for (const field in err?.errors) {
                    (validationErrors as any)[field as any] = err.errors[field].message;
                }
                console.error("Validation Errors:", validationErrors);
            } else if (err) {
                next(err);
            } 
        }
    }
}

export const authService = new AuthService();