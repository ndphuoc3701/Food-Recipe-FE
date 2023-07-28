import { Image } from "../model/image";

export class EvaluationRequest {
  constructor(public userId: number, public recipeId: number, public numStar: number, public content: string, public note: string, public images:Image[]) { }
}