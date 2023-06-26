export class Recipe {
  constructor(
    public name: string,
    public img: string,
    public favorite: boolean,
    public numStar: number,
    public numEvaluate: number,
  ) { }
}