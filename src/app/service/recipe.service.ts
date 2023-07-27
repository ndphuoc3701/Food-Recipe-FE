import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../Constant';
import { RecipeSharing } from '../model/recipeSharing';
import { RecipeSharingRequest } from '../request/recipe-sharing-request';
import { RecipeDetail } from '../model/recipeDetail';
import { Recipe } from '../model/recipe';
import { Pagination } from '../model/pagination';
import { FavoriteRecipeRequest } from '../request/favorite-recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  RECIPE_HOST = HOST + 'recipes';
  numPage!: number;
  selectedPage!: number;
  recipes!: Recipe[];


  createRecipe(recipeSharing: RecipeSharingRequest) {
    return this.http.post<void>(this.RECIPE_HOST, recipeSharing);
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

  getFavoriteRecipesByUserId(userId: number, pageNumber: number) {
    return this.http.get<Pagination<Recipe>>(`${this.RECIPE_HOST}/favorite?userId=${userId}&page=${pageNumber}`);
  }

}
