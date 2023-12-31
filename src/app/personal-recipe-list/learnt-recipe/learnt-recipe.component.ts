import { Component } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { LearntRecipe } from 'src/app/model/learntRecipe';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleRecipeFormComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';
import { RecipeService } from 'src/app/service/recipe.service';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-learnt-recipe',
  templateUrl: './learnt-recipe.component.html',
  styleUrls: ['./learnt-recipe.component.css', '../personal-recipe-list.component.css']
})
export class LearntRecipeComponent {

  constructor(private dialog: MatDialog, public recipeService: RecipeService) { }

  edit(event: any, learntRecipeIndex: number, learntRecipe: LearntRecipe) {
    this.openEditDialog(learntRecipeIndex, learntRecipe.evaluation.note!, learntRecipe.recipe);
    event.stopImmediatePropagation();
  }
  openEditDialog(learntRecipeIndex: number, note: string, recipe: Recipe): void {
    const dialogRef = this.dialog.open(ScheduleRecipeFormComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        title: 'Chỉnh sửa ghi chú món ăn đã học',
        recipeIdx: learntRecipeIndex,
        recipeName: recipe.name,
        recipeImage: recipe.image,
        recipeId: recipe.id,
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recipeService.learntRecipes[result.recipeIdx].evaluation.note = result.note
    });
  }
}

