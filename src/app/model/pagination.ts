import { Recipe } from "./recipe";

export class Pagination<T> {
  constructor(public objects: T[], public totalPages: number) { }
}