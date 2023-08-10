import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const aadharValidator = (param : string) => {
    return (value : any) => {
        if (!value || !/^\d{12}$/.test(value)) {
          throw new Error(`${param} must be a 12-digit number`);
        }
        return true;
      };
}

export const validate = (req : Request, res : Response, next : NextFunction)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    next(errors);
}


export const loginValidators = [
    body('username').isString().notEmpty().withMessage('Username Is Required!'),
    body('password').isString().notEmpty().withMessage('Password IS Required!'),
    validate
];

export const otpValidators = [
    body('email').isEmail().notEmpty().withMessage("Please Provide Email!"),
    validate
]

export const signupValidators = [
    body('name').isString().notEmpty().withMessage("Name is required!"),
    body('username').isString().notEmpty().withMessage("Username is required!"),
    body('email').isEmail().notEmpty().withMessage("Email is required!"),
    body('aadhar').isNumeric().custom(aadharValidator('aadhar')),
    body('pan').isString().notEmpty().withMessage("Pan is required!"),
    body('address').isString().notEmpty().withMessage("Address is required!"),
    body('gender').isString().notEmpty().withMessage("Gender is required!"),
    body('dateOfBirth').isString().notEmpty().withMessage("Date is required!"),
    body('password').isString().notEmpty().withMessage("Password is required!"),
    // body('dateOfBirth').isDate().notEmpty().withMessage("Date is required!"),
    validate
];
