export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public favorite: boolean,
    public numStar: number,
    public numEvaluate: number,
    public numLike: number,
    public createdDate: string
  ) { }
}