import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HOST } from '../Constant';
import { RecipeSharing } from '../model/recipeSharing';
import { RecipeSharingRequest } from '../request/recipe-sharing-request';
import { RecipeDetail } from '../model/recipeDetail';
import { Recipe } from '../model/recipe';
import { Pagination } from '../model/pagination';
import { FavoriteRecipeRequest } from '../request/favorite-recipe';
import { ScheduleRecipeFormComponent } from '../edit-personal-recipe/edit-personal-recipe.component';
import { MatDialog } from '@angular/material/dialog';
import { LearntRecipe } from '../model/learntRecipe';
import { ScheduleRecipe } from '../model/scheduleRecipe';
import { ScheduleRequest } from '../request/schedule-request';
import { UserService } from './user.service';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService, @Inject(LOCALE_ID) private locale: string) { }

  RECIPE_HOST = HOST + 'recipes';
  numPage!: number;
  selectedPage!: number;
  recipes!: Recipe[];

  learntRecipes!: LearntRecipe[];

  scheduleRecipes!: ScheduleRecipe[];

  createRecipe(recipeSharing: RecipeSharingRequest) {
    return this.http.post<Recipe>(this.RECIPE_HOST, recipeSharing);
  }

  getLearningRecipesByUserId(userId: number, pageNumber: number) {
    return this.http.get<Pagination<LearntRecipe>>(`${this.RECIPE_HOST}/learning?userId=${userId}&page=${pageNumber}`);
  }

  getRecipesByPage(pageNumber: number) {
    return this.http.get<Pagination<Recipe>>(`${this.RECIPE_HOST}?page=${pageNumber}`);
  }

  getRecipesByUserId(userId: number, pageNumber: number) {
    return this.http.get<Pagination<Recipe>>(`${this.RECIPE_HOST}/users/${userId}?page=${pageNumber}`);
  }

  addFavoriteRecipe(userId: number, recipeId: number) {
    return this.http.post<void>(`${this.RECIPE_HOST}/favorite?userId=${userId}&recipeId=${recipeId}`, {})
  }

  deleteFavoriteRecipe(userId: number, recipeId: number) {
    return this.http.delete<void>(`${this.RECIPE_HOST}/favorite?userId=${userId}&recipeId=${recipeId}`)
  }

  getFavoriteRecipesByUserId(userId: number, pageNumber: number) {
    return this.http.get<Pagination<Recipe>>(`${this.RECIPE_HOST}/favorite?userId=${userId}&page=${pageNumber}`);
  }

  getRecipeDetailById(recipeId: number, userId: number) {
    return this.http.get<RecipeDetail>(`${this.RECIPE_HOST}/${recipeId}?userId=${userId}`);
  }

  scheduleRecipe(scheduleRequest: ScheduleRequest) {
    return this.http.post<void>(`${this.RECIPE_HOST}/scheduling`, scheduleRequest);
  }

  updateScheduleRecipe(scheduleRequest: ScheduleRequest) {
    return this.http.put<void>(`${this.RECIPE_HOST}/scheduling`, scheduleRequest);
  }

  deleteScheduleRecipe(userId: number, recipeId: number) {
    return this.http.delete<void>(`${this.RECIPE_HOST}/scheduling?userId=${userId}&recipeId=${recipeId}`)
  }

  getScheduleRecipesByUserId(userId: number, pageNumber: number) {
    return this.http.get<Pagination<ScheduleRecipe>>(`${this.RECIPE_HOST}/scheduling?userId=${userId}&page=${pageNumber}`);
  }

  getRecipeByKeyWord(keyword: string, pageNumber: number) {
    return this.http.get<Pagination<ScheduleRecipe>>(`${this.RECIPE_HOST}/es?keyword=${keyword}&page=${pageNumber}`);
  }

  getRecipeByKeyWordInput(keyword: string) {
    return this.http.get<Pagination<ScheduleRecipe>>(`${this.RECIPE_HOST}/search?keyword=${keyword}`);
  }

  openScheduleDialog(recipeName: string, recipeImage: string, recipeId: number): void {
    const dialogRef = this.dialog.open(ScheduleRecipeFormComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        title: 'Lên lịch nấu ăn',
        recipeImage: recipeImage,
        recipeName: recipeName,
        recipeId: recipeId
      }
    })
    dialogRef.afterClosed().subscribe(scheduleRecipe => {
      if (scheduleRecipe != null) {
        let scheduleRequest = new ScheduleRequest(this.userService.userInfo?.id!, scheduleRecipe.recipeId, scheduleRecipe.note, formatDate(scheduleRecipe.scheduledTime, 'yyyy-MM-dd HH:mm', this.locale));
        console.log(scheduleRequest);
        this.scheduleRecipe(scheduleRequest).subscribe();
      }
    });
    ;
  }
}
