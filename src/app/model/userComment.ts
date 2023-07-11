import { UserInfo } from "./user-info";

export class UserComment {
  constructor(public id: number, public content: string, public user: UserInfo, public taggedUser: string, public createdDate: string) { }
}