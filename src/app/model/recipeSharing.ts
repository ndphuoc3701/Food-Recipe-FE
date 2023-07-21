import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class RecipeSharing {
  constructor(public name: string, public image: string, public ingredients: Ingredient[], public instructions: Instruction[], public ownerId: number) { }
}