import { Request, Response,  NextFunction } from "express";
import { Result, ValidationError } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err.errors?.length) {
      const errorMessages : string[] = (err as Result<ValidationError>).array().filter((e: ValidationError)=>e.msg!=='Invalid value').map((e : ValidationError)=>e.msg);
      res.status(StatusCodes.BAD_GATEWAY).json({
        errors : errorMessages
      })
    } else {
        res.status(err.statusCode || 500).send({
            message : err.message || 'Something went wrong!'
        });
    }
}