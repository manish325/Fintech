import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse, IResponse, ISignup } from '../../models/auth.types';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../enums/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(credentials : ILogin) : Observable<ILoginResponse | IResponse> {
    return this.http.post(ApiEndpoints.login, credentials) as  Observable<ILoginResponse | IResponse>;
  }

  getOtp(payload : {email : string}) : Observable<IResponse> {
    return this.http.post(ApiEndpoints.getOtp, payload) as Observable<IResponse>
  }

  signup(credentials : ISignup) : Observable<IResponse> {
    return this.http.post(ApiEndpoints.signup, credentials) as Observable<IResponse>
  }
}
