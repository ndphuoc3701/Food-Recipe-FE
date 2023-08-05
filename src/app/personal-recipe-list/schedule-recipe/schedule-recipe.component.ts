import { Component } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { Recipe } from 'src/app/model/recipe';
import { LearntRecipe } from 'src/app/model/learntRecipe';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleRecipe } from 'src/app/model/scheduleRecipe';
import { ScheduleRecipeFormComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';
@Component({
  selector: 'app-schedule-recipe',
  templateUrl: './schedule-recipe.component.html',
  styleUrls: ['./schedule-recipe.component.css', '../personal-recipe-list.component.css']
})
export class ScheduleRecipeComponent {


  listType: ListType = ListType.Schedule;
  scheduleRecipes: ScheduleRecipe[] = [
    new ScheduleRecipe(1, new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023'), 'Thêm muối', '21/6/2023 18:30'),
    new ScheduleRecipe(2, new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023'), 'Thêm mắm', '21/6/2023 18:30')
  ];
  // scheduleRecipes!: LearntRecipe[];

  constructor(private dialog: MatDialog) { }

  lol(event: any) {
    event.stopImmediatePropagation();
  }
  edit(event: any, recipeIdx: number, scheduleRecipe: ScheduleRecipe) {
    event.stopImmediatePropagation();
    this.openEditDialog(recipeIdx, scheduleRecipe.scheduleTime!, scheduleRecipe.note!, scheduleRecipe.recipe.name, scheduleRecipe.recipe.image);

  }
  openEditDialog(recipeIdx: number, scheduleDate: string, note: string, recipeName: string, recipeImage: string): void {

    const dialogRef = this.dialog.open(ScheduleRecipeFormComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        title: 'Chỉnh sửa công thức đã lên lịch',
        recipeIdx: recipeIdx,
        scheduledDate: '2023-07-15T18:48',
        recipeName: recipeName,
        recipeImage: recipeImage,
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.scheduleRecipes[result.recipeIdx].scheduleTime = result.scheduledDate;
      this.scheduleRecipes[result.recipeIdx].note = result.note;
    });
  }
}
