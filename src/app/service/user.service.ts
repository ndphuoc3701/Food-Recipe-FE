import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../model/userLogin';
import { HOST } from '../Constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(userLogin: UserLogin) {
    return this.http.post<UserLogin>(HOST + 'users', userLogin);
  }

  login(userLogin: UserLogin) {
    return this.http.post<UserLogin>(HOST + 'users/login', userLogin);
  }
  isLoggedInSubject: Subject<UserLogin | null> = new Subject<UserLogin | null>();
}
