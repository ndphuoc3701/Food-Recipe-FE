import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";
import { Recipe } from "./recipe";
import { RecipeSharing } from "./recipeSharing";
import { UserInfo } from "./user-info";

export class RecipeDetail {
  constructor(public recipe: Recipe, public userInfo: UserInfo, public recipeSharing: RecipeSharing) { }
}