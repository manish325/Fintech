import express , {Request, Response, NextFunction} from "express";
import { IRoute } from "./routes.types";
import { authRouter } from "../modules/Auth/auth.route";
import { userRouter } from "../modules/User/user.routes";
import {Result , ValidationError} from "express-validator";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../error-handlers/error-handler";

const routes : IRoute[] = [
    {
        path : '/auth',
        router : authRouter
    },
    {
        path : '/user',
        router : userRouter
    }
]
export const registerRoutes = (app : express.Application) => {
    routes.map((route : IRoute)=>{
        app.use(route.path, route.router);
    });
    app.use(errorHandler);
}