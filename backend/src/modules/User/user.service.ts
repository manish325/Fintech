import {StatusCodes} from "http-status-codes";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IError, ILoginResponse } from "../../core/interfaces";
import { sign, SignOptions, VerifyOptions } from 'jsonwebtoken';

class UserService {
    constructor() {}

}

export const userService = new UserService();