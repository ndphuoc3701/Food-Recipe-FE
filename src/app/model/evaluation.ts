import { Image } from "./image";
import { Recipe } from "./recipe";
import { UserInfo } from "./user-info";

export class Evaluation {
  constructor(public id: number, public content: string, public numStar: number,
    public user: UserInfo, public createdDate: string, public numLike: number,
    public numDislike: number, public numComment: number, public images: Image[], public note: string | null, public recipe: Recipe | null, public isLike?: boolean) { }
}