import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";
import { Recipe } from "./recipe";
import { RecipeSharing } from "./recipeSharing";
import { UserInfo } from "./user-info";

export class RecipeDetail {
  constructor(public recipe: Recipe, public user: UserInfo, public recipeSharing: RecipeSharing) { }
}