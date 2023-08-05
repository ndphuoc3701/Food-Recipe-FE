import { Recipe } from "./recipe";

export class ScheduleRecipe {
  constructor(public id: number, public recipe: Recipe, public note: string, public scheduleTime: string) { }
}