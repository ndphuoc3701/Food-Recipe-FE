import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/userLogin';
import { Router } from '@angular/router';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.userService.isLoggedInSubject.subscribe(v => {
      this.userService.userInfo = v;
      if (v == null) {
        this.router.navigate(['/login']);
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }
  // userLogin: UserLogin | null = null;
  // userLogin: UserLogin | null = new UserLogin('lol', 'cc', 'ccs', 'c');
  ;


  constructor(public userService: UserService, private router: Router) { }

  logOut() {
    this.userService.isLoggedInSubject.next(null);
  }

}
