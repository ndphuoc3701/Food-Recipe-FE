import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeShareFormComponent } from '../recipe-share-form/recipe-share-form.component';

@Component({
  selector: 'app-your-recipe',
  templateUrl: './your-recipe.component.html',
  styleUrls: ['./your-recipe.component.css']
})
export class YourRecipeComponent {
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
