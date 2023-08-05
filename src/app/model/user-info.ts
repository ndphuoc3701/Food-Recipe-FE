export class UserInfo {
  constructor(public id: number | null, public fullName: string | null, public username: string | null, public password: string | null, public image: string | null, public cookLevel?: number, public evaluationLevel?: number) { }
}