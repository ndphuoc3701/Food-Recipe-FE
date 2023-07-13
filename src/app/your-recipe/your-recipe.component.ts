import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeShareFormComponent } from '../recipe-share-form/recipe-share-form.component';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-your-recipe',
  templateUrl: './your-recipe.component.html',
  styleUrls: ['./your-recipe.component.css']
})
export class YourRecipeComponent {
  recipes: Recipe[] = [new Recipe(1, "Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, ''),
  new Recipe(2, "Heo hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '')]
  constructor(private dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(RecipeShareFormComponent, {
      width: '40%',
      panelClass: 'custom-modalbox',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
