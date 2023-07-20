import { Component, OnInit } from '@angular/core';
import { EMPTY_MESSAGE_ERROR } from '../Constant';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/userLogin';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../recipe-share-form/recipe-share-form.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  fullName: string = '';
  username: string = '';
  password: string = '';
  userImage: string = '';

  EMPTY_MESSAGE_ERROR: string = EMPTY_MESSAGE_ERROR;

  constructor(public router: Router, private userService: UserService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.directLoginOrSignUp(event));
  }

  ngOnInit(): void {
    if (this.router.url.includes('sign-up')) {
      this.isLogin = false;
    }
    else {
      this.isLogin = true;
    }
  }

  directLoginOrSignUp(location: any) { // This method is called many times
    console.log(location.url); // This prints a loot of routes on console
    if (location.url === '/login') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    console.log(this.isLogin);

  }

  validate: { fullName: boolean, username: boolean, password: boolean, userImage: boolean } = {
    fullName: true,
    username: true,
    password: true,
    userImage: true
  }

  addUserImage() {
    let image = '';
    let input = document.createElement('input');
    input.type = 'file';
    input.addEventListener
    input.onchange = event => {
      let file = (event.target as HTMLInputElement).files![0]
      if (!file || file.length == 0) {
        alert('You must select an image');
        return;
      }

      var mimeType = file.type;

      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.userImage = reader.result! as string;
      }
    };
    input.click();
    return image;
  }

  submit() {

    console.log('lolc');
    console.log(this.isLogin);
    if (this.validateInput()) {


      if (this.isLogin) {
        console.log('lolc');
        this.userService.login(new UserLogin(this.fullName, this.username, this.password, this.userImage)).subscribe(userLogin => {
          this.userService.isLoggedInSubject.next(userLogin);
        })
      }
      else {
        this.userService.signUp(new UserLogin(this.fullName, this.username, this.password, this.userImage)).subscribe(userLogin => {
          this.userService.isLoggedInSubject.next(userLogin);
        })
      }
    }
  }

  validateInput() {
    return (this.isLogin || this.validateFullName()) && this.validateUserName() && this.validatePassword();
  }

  validateFullName() {
    if (this.fullName == '') {
      this.validate.fullName = false;
      return false;
    }
    this.validate.fullName = true;
    return true;
  }
  validateUserName() {
    if (this.username == '') {
      this.validate.username = false;
      return false;
    }
    this.validate.username = true;
    return true;
  }

  validatePassword() {
    if (this.password == '') {
      this.validate.password = false;
      return false;
    }
    this.validate.password = true;
    return true;
  }
}
