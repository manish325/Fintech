import  Mongoose , {model}  from "mongoose";
import { IUser } from "./auth.types";

const userSchema = new Mongoose.Schema(
    {
        username : {
            type : String,
            unique : [true, 'Username already taken!'],
            required : [true, 'Must Enter Username']
        },
        password : {
            type : String,
            required : [true, "Must Enter Password"]
        },
        email : {
            type : String,
            match : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        name : {
            type : String,
            required : [true, "Must Have name!"]
        },
        gender : {
            type : String,
        },
        dateOfBirth : Date,
        address : String,
        aadhar : {
            type : String,
            required : [true , "Must have aadhar"],
            minlength : [12 , "Invalid Aadhar"]
        },
        pan : {
            type : String,
            required : [true , "Must have PAN"]
        },
        otp : {
            type : Number || null,
        }
    }
);

export const userModel = model <IUser> ('user', userSchema);