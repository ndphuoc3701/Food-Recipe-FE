import { IngredientRecipeRequest } from "./ingredient-recipe-request";
import { InstructionRequest } from "./instruction-request";


export class RecipeSharingRequest {
  constructor(public name: string, public image: string, public ingredientRecipeRequests: IngredientRecipeRequest[], public instructionRequests: InstructionRequest[]) { }
}