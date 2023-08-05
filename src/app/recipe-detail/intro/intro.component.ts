import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeDetail } from 'src/app/model/recipeDetail';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  @Input() recipeDetail!: RecipeDetail



  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }

  favoriteHover: boolean = false;

  mouseEnterFavorite() {
    console.log(this.recipeDetail);

    this.favoriteHover = true;
  }

  mouseLeaveFavorite() {
    this.favoriteHover = false;
  }

  clickFavorite() {
    this.recipeDetail.recipe.favorite = !this.recipeDetail.recipe.favorite;
    this.favoriteHover = false
  }
}
