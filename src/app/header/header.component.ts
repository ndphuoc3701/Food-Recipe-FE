import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/userLogin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.userService.isLoggedInSubject.subscribe(v => {
      this.userLogin = v;
      console.log(this.userLogin);

    })
  }
  userLogin!: UserLogin;
  constructor(private userService: UserService) { }

}
