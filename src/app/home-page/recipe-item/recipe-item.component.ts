import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  favoriteHover: boolean = false;

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

  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }
}
