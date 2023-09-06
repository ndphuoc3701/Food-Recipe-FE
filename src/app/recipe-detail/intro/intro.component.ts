import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Recipe } from 'src/app/model/recipe';
import { RecipeDetail } from 'src/app/model/recipeDetail';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  constructor(private recipeService: RecipeService, private userService: UserService, private dialog: MatDialog) { }
  @Input() recipeDetail!: RecipeDetail



  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }

  favoriteHover: boolean = false;

  mouseEnterFavorite() {
    this.favoriteHover = true;
  }

  mouseLeaveFavorite() {
    this.favoriteHover = false;
  }

  clickFavorite() {
    this.favoriteHover = false;
    if (!this.recipeDetail.recipe.favorite) {
      this.recipeService.addFavoriteRecipe(this.userService.userInfo?.id!, this.recipeDetail.recipe.id).subscribe();
      this.recipeDetail.recipe.favorite = true;
    }
    else {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        data: { text: 'Huỷ yêu thích món này?', isConfirm: true }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.recipeService.deleteFavoriteRecipe(this.userService.userInfo?.id!, this.recipeDetail.recipe.id).subscribe();
          this.recipeDetail.recipe.favorite = false;
        }
      }
      )
    }
  }
}
