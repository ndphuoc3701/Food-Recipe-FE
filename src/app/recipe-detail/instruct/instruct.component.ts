import { Component, Input } from '@angular/core';
import { RecipeDetail } from 'src/app/model/recipe-detail';

@Component({
  selector: 'app-instruct',
  templateUrl: './instruct.component.html',
  styleUrls: ['./instruct.component.css']
})
export class InstructComponent {
  @Input() recipeDetail!: RecipeDetail
}
