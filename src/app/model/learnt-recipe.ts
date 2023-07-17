import { Recipe } from "./recipe";

export class LearntRecipe {
  constructor(public recipe: Recipe, public note: string, public learntImages: string[]) { }
}