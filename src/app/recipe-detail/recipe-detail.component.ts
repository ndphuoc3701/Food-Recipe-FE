import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeDetail } from '../model/recipeDetail';
import { UserInfo } from '../model/user-info';
import { Ingredient } from '../model/ingredient';
import { Instruction } from '../model/instruction';
import { RecipeSharing } from '../model/recipeSharing';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail!: RecipeDetail;

  ngOnInit(): void {
    let recipe = new Recipe("Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, "20/5/2023");
    let userInfo = new UserInfo("Nguyen Duy Phuoc", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", 4.1, 3.5);
    let ingredients = [new Ingredient("Chanh", "1 trái"),
    new Ingredient("Bò", "5kg")]
    this.recipeDetail = new RecipeDetail(recipe, userInfo, new RecipeSharing('l', '', ingredients, [new Instruction('Đun nước sôi', ['/assets/icon/cooker.png', '/assets/icon/forbidden.png']), new Instruction('Cắt thịt bò', ['/assets/icon/cookLevel.png'])]));
  }

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
    this.recipeDetail.recipe.favorite = !this.recipeDetail.recipe.favorite;
    this.favoriteHover = false
  }
}
