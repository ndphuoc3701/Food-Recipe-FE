import { Component } from '@angular/core';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-common-recipe-list',
  templateUrl: './common-recipe-list.component.html',
  styleUrls: ['./common-recipe-list.component.css']
})
export class CommonRecipeListComponent {
  recipe: Recipe = new Recipe("Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, "20/5/2023");
  favoriteHover: boolean = false;

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

  clickFavorite() {
    this.recipe.favorite = !this.recipe.favorite;
    this.favoriteHover = false
  }
}
