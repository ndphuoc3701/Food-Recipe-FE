import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  postImage(a: string) {
    return this.http.post<{ encodedImage: string }>(HOST + 'api/recipes/lol', { "encodedImage": a });
  }

}
