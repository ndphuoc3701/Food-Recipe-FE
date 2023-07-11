import { UserInfo } from "./user-info";
import { UserComment } from "./userComment";

export class Evaluation {
  constructor(public id: number, public content: string, public numStar: number,
    public user: UserInfo, public createdDate: string, public numLike: number,
    public numDislike: number, public images: File[], public imageUrls: string[], public isLike?: boolean,) { }
}