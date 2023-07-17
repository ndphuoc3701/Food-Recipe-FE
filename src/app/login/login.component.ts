import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = true;
  username!: string;
  password!: string;
  userImage!: string;

  EMPTY_MESSAGE_ERROR: string = "Vui lòng không để trống trường này";
  EMPTY_IMAGE_MESSAGE_ERROR: string = "Vui lòng đăng một bức ảnh";

  validate: { username: boolean, password: boolean, userImage: boolean } = {
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
}
