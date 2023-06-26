import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";
import { UserInfo } from "./user-info";

export class RecipeDetail {
  constructor(public recipe: Recipe, public userInfo: UserInfo, public numLike: number, public createdDate: string, public ingredients: Ingredient[], public steps: string[]) { }
}