export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public favorite: boolean,
    public numStar: number,
    public numEvaluate: number,
    public numFavorite: number,
    public createdDate?: string,
    public learntDate?: string,
    public scheduledDate?: string
  ) { }
}