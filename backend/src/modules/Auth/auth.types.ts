export interface ILoginUser {
    username : string,
    password : string
}

export interface ISignupUser {
    email : string,
    name : string,
    gender : string | null,
    dateOfBirth : Date,
    address : string,
    aadhar : string,
    pan : string
}

export interface IUser extends ILoginUser , ISignupUser {
    opt : number | null
}
