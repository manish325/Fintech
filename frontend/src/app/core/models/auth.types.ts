export interface ILogin {
    username : string,
    password : string
}

export interface ILoginResponse {
    token : string
}

export interface IResponse {
    success : boolean,
    message : string
}

export interface ISignup {
    email : string,
    name : string,
    gender : string | null,
    dateOfBirth : Date,
    address : string,
    aadhar : string,
    pan : string,
    username : string,
    password : string
}

export interface ISignupErrors {
    email ? : string,
    gender ? : string,
    dateOfBirth ?: string,
    aadhar ?: string,
    pan ?: string,
    username ?: string
}