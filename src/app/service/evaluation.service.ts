import { Injectable } from '@angular/core';
import { HOST } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { EvaluationRequest } from '../request/evaluation';
import { Evaluation } from '../model/evaluation';
import { Pagination } from '../model/pagination';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }

  EVALUATION_HOST = HOST + 'evaluations';

  createRecipe(evaluationRequest: EvaluationRequest) {
    return this.http.post<Evaluation>(this.EVALUATION_HOST, evaluationRequest);
  }

  getEvaluationsByRecipeId(recipeId: number, pageNumber: number) {
    return this.http.get<Pagination<Evaluation>>(`${this.EVALUATION_HOST}/${recipeId}?page=${pageNumber}`);
  }
}
