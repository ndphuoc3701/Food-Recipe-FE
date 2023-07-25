export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public favorite: boolean,
    public numStar: number,
    public numEvaluation: number,
    public numFavorite: number,
    public createdDate?: string,
    public learntDate?: string,
    public scheduledDate?: string
  ) { }
}