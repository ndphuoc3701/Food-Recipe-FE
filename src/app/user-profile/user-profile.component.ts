import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/user-info';
import { UserService } from '../service/user.service';
import { RecipeService } from '../service/recipe.service';
import { Pagination } from '../model/pagination';
import { Recipe } from '../model/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  ngOnInit(): void {
    // userId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams
      .subscribe(params => {
        this.recipeService.selectedPage = +params['page'];
        if (isNaN(this.recipeService.selectedPage)) {
          this.recipeService.selectedPage = 1;
        }
        if (this.userId != this.userService.userInfo?.id) {
          this.userService.getUserInfo(this.userId).subscribe(userInfo => this.userInfo = userInfo);
        }
        console.log(this.userService.userInfo);

        this.userInfo = this.userService.userInfo!;
        this.recipeService.getRecipesByUserId(this.userId, this.recipeService.selectedPage).subscribe(res => {
          this.getResponse(res);
        });
      });
  }

  userId: number = Number(this.route.snapshot.paramMap.get('id'));
  userInfo!: UserInfo
  userImage: string | null = null;
  constructor(public userService: UserService, public recipeService: RecipeService, private route: ActivatedRoute) { }

  getResponse(res: Pagination<Recipe>) {
    this.recipeService.recipes = res.objects;
    this.recipeService.numPage = res.totalPages;
  }
  uploadImage() {
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

  updateImage() {
    let userInfo = new UserInfo(this.userService.userInfo!.id!, null, null, null, this.userImage!);
    this.userService.updateImage(userInfo!).subscribe(() => {

      this.userService.userInfo!.image = this.userImage;
      this.userImage = null;
    }
    );
  }

  page1() {
    return this.recipeService.selectedPage == 1 ? 1 : this.recipeService.selectedPage == this.recipeService.numPage && this.recipeService.numPage != 2 ? this.recipeService.numPage - 2 : this.recipeService.selectedPage - 1;
  }

  page2() {
    return this.recipeService.selectedPage == 1 ? 2 : this.recipeService.selectedPage == this.recipeService.numPage && this.recipeService.numPage != 2 ? this.recipeService.selectedPage - 1 : this.recipeService.selectedPage;
  }

  page3() {
    return this.recipeService.selectedPage == this.recipeService.numPage ? this.recipeService.selectedPage : this.recipeService.selectedPage == 1 ? 3 : this.recipeService.selectedPage + 1;
  }


}
