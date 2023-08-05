import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  favoriteHover: boolean = false;

  constructor(private recipeService: RecipeService) {

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
    this.recipeService.addFavoriteRecipe(1, 6).subscribe();

  }

  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }
}
