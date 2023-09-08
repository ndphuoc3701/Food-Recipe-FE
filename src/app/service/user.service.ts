import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../Constant';
import { Subject } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USER_HOST = HOST + 'users';

  // userInfo: UserInfo | null = null;
  userInfo: UserInfo | null = new UserInfo(2, "NDP", "u2", "p", "/assets/user/u2.jpg", 4.3, 3.7);

  constructor(private http: HttpClient, router: Router) { }

  signUp(userInfo: UserInfo) {
    return this.http.post<UserInfo>(this.USER_HOST, userInfo);
  }

  login(userInfo: UserInfo) {
    return this.http.post<UserInfo>(this.USER_HOST + '/login', userInfo);
  }

  updateImage(userInfo: UserInfo) {
    return this.http.put<UserInfo>(this.USER_HOST + '/update-image', userInfo);
  }

  getUserInfo(userId: number) {
    return this.http.get<UserInfo>(this.USER_HOST + `/info/${userId}`);
  }
  isLoggedInSubject: Subject<UserInfo | null> = new Subject<UserInfo | null>();


}
