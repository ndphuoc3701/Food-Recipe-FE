import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ListType } from '../personal-recipe-list.component';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

export class ClassName {
  readonly ListType = ListType;
}

@Component({
  selector: 'app-common-recipe-list',
  templateUrl: './common-recipe-list.component.html',
  styleUrls: ['./common-recipe-list.component.css', '../../recipe-detail/recipe-detail.component.css']
})
export class CommonRecipeListComponent implements OnInit {
  ngOnInit(): void {
    this.isClock = !this.router.url.includes('scheduled-recipes');
    if (this.router.url.includes('favorite-recipes')) {
      this.isFavorite = true;
    }

  }
  isFavorite: boolean = false;

  constructor(private recipeService: RecipeService, private router: Router, private userService: UserService, private dialog: MatDialog) { }
  @Input() recipe!: Recipe;
  favoriteHover: boolean = false;
  date!: string;
  isClock: boolean = false;
  note: boolean = false;
  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }

  mouseEnterFavorite() {
    this.favoriteHover = true;
  }

  mouseLeaveFavorite() {
    this.favoriteHover = false;
  }

  clickFavorite(event: any) {
    event.stopImmediatePropagation();
    this.favoriteHover = false;
    if (!this.recipe.favorite) {
      this.recipeService.addFavoriteRecipe(this.userService.userInfo?.id!, this.recipe.id).subscribe();
      this.recipe.favorite = true;
    }
    else {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        data: { text: 'Huỷ yêu thích món này?', isConfirm: true }
      });
      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.recipeService.deleteFavoriteRecipe(this.userService.userInfo?.id!, this.recipe.id).subscribe();
          this.recipe.favorite = false;
        }
      }
      )
    }
  }

  clickClock(event: any, recipeName: string, recipeImage: string, recipeId: number) {
    event.stopImmediatePropagation();
    this.recipeService.openScheduleDialog(recipeName, recipeImage, recipeId);
  }
}
