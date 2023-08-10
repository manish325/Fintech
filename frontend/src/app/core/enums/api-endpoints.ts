export class ApiEndpoints {
    public static auth = 'auth';
    public static login = `${this.auth}/login`;
    public static signup = `${this.auth}/signup`;
    public static getOtp = `${this.auth}/getOtp`;
}