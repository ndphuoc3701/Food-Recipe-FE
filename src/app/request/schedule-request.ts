export class ScheduleRequest {
  constructor(public userId: number, public recipeId: number, public note: string, public scheduleTime: string) { }
}