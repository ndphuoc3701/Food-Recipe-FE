import { Evaluation } from "./evaluation";
import { Recipe } from "./recipe";

export class LearntRecipe {
  constructor(public recipe: Recipe, public evaluation: Evaluation) { }
}