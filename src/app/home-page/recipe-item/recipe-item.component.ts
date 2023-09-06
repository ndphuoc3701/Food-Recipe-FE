import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  favoriteHover: boolean = false;

  constructor(private recipeService: RecipeService, private userService: UserService) {

  }

  mouseEnterFavorite() {
    this.favoriteHover = true;
  }

  mouseLeaveFavorite() {
    this.favoriteHover = false;
  }

  clickFavorite(event: any) {
    event.stopImmediatePropagation();
    this.recipe.favorite = !this.recipe.favorite;
    this.favoriteHover = false;
    if (this.recipe.favorite)
      this.recipeService.addFavoriteRecipe(this.userService.userInfo?.id!, this.recipe.id).subscribe();
    else
      this.recipeService.deleteFavoriteRecipe(this.userService.userInfo?.id!, this.recipe.id).subscribe();
  }

  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }
}
