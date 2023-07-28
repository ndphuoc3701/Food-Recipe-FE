import { Component } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { LearntRecipe } from 'src/app/model/learntRecipe';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonalRecipeComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';

@Component({
  selector: 'app-learnt-recipe',
  templateUrl: './learnt-recipe.component.html',
  styleUrls: ['./learnt-recipe.component.css', '../personal-recipe-list.component.css']
})
export class LearntRecipeComponent {
  listType: ListType = ListType.Schedule;
  // learntRecipes: LearntRecipe[] = [
  //   new LearntRecipe(new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023', '22/6/2023', '23/6/2023'), 'Thêm muối', ['/assets/icon/cooker.png', '/assets/icon/cookLevel.png']),
  //   new LearntRecipe(new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023', '21/5/2023', '22/5/2023'), 'Thêm mắm', ['/assets/icon/cookLevel.png', '/assets/icon/cooker.png'])
  // ];
  learntRecipes!: LearntRecipe[];

  constructor(private dialog: MatDialog) { }

  lol(event: any) {
    event.stopImmediatePropagation();
  }

  edit(event: any, learntRecipeIndex: number, learntRecipe: LearntRecipe) {
    this.openEditDialog(learntRecipeIndex, learntRecipe.evaluation.note!);
    event.stopImmediatePropagation();
  }
  openEditDialog(learntRecipeIndex: number, note: string): void {
    const dialogRef = this.dialog.open(EditPersonalRecipeComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        recipeIdx: learntRecipeIndex,
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.learntRecipes[result.recipeIdx].evaluation.note = result.note
    });
  }
}

