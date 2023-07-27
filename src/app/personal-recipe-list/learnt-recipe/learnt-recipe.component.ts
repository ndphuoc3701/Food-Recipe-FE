import { Component } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { Recipe } from 'src/app/model/recipe';
import { LearntRecipe } from 'src/app/model/learnt-recipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { EditPersonalRecipeComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';
import { Image } from 'src/app/model/image';

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

  addLearntImage(learntRecipesIndex: number) {
    let lengthImage = this.learntRecipes[learntRecipesIndex].evaluation.images.length
    if (lengthImage > 0) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        autoFocus: false
      });
      return;
    }
    this.uploadImage(learntRecipesIndex);
  }

  uploadImage(instructionIndex: number) {
    let image = '';
    let input = document.createElement('input');
    input.type = 'file';
    input.addEventListener
    input.onchange = event => {
      let file = (event.target as HTMLInputElement).files![0]
      if (!file || file.length == 0) {
        alert('You must select an image');
        return;
      }

      var mimeType = file.type;

      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.learntRecipes[instructionIndex].evaluation.images.push(new Image(reader.result! as string));
      }
    };
    input.click();
    return image;
  }

  removeLearntRecipeImage(learntRecipeIndex: number, imageIndex: number) {
    this.learntRecipes[learntRecipeIndex].evaluation.images.splice(imageIndex, 1);
  }

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

