import { Component } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { Recipe } from 'src/app/model/recipe';
import { LearntRecipe } from 'src/app/model/learntRecipe';
import { EditPersonalRecipeComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-schedule-recipe',
  templateUrl: './schedule-recipe.component.html',
  styleUrls: ['./schedule-recipe.component.css', '../personal-recipe-list.component.css']
})
export class ScheduleRecipeComponent {


  listType: ListType = ListType.Schedule;
  // scheduleRecipes: LearntRecipe[] = [
  //   new LearntRecipe(new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023', '22/6/2023', '23/6/2023'), 'Thêm muối', ['/assets/icon/cooker.png', '/assets/icon/cookLevel.png']),
  //   new LearntRecipe(new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023', '21/5/2023', '22/5/2023'), 'Thêm mắm', ['/assets/icon/cookLevel.png', '/assets/icon/cooker.png'])
  // ];
  scheduleRecipes!: LearntRecipe[];

  constructor(private dialog: MatDialog) { }

  lol(event: any) {
    event.stopImmediatePropagation();
  }
  edit(event: any, recipeIdx: number, scheduleRecipe: LearntRecipe) {
    this.openEditDialog(recipeIdx, scheduleRecipe.recipe.scheduledDate!, scheduleRecipe.evaluation.note!);

    event.stopImmediatePropagation();
  }
  openEditDialog(recipeIdx: number, scheduleDate: string, note: string): void {
    console.log(new Date('2023-07-15T18:48').toLocaleDateString() + ' ' + new Date('2023-07-15T18:48').toLocaleTimeString());

    const dialogRef = this.dialog.open(EditPersonalRecipeComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        recipeIdx: recipeIdx,
        scheduledDate: '2023-07-15T18:48',
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.scheduleRecipes[result.recipeIdx].recipe.scheduledDate = result.scheduledDate;
      this.scheduleRecipes[result.recipeIdx].evaluation.note = result.note;
    });
  }
}
