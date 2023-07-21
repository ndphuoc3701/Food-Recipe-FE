import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../Constant';
import { RecipeSharing } from '../model/recipeSharing';
import { RecipeSharingRequest } from '../request/recipe-sharing-request';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  // postImage(a: string) {
  //   return this.http.post<{ encodedImage: string }>(HOST + 'api/recipes/lol', { "encodedImage": a });
  // }

  createRecipe(recipeSharing: RecipeSharingRequest) {
    return this.http.post<void>(HOST + 'api/recipes', recipeSharing);
  }

}
