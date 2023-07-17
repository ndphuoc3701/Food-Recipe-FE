import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-personal-recipe',
  templateUrl: './edit-personal-recipe.component.html',
  styleUrls: ['./edit-personal-recipe.component.css']
})
export class EditPersonalRecipeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    recipeIdx: number
    scheduledDate: string,
    note: string
  }) { }
}
