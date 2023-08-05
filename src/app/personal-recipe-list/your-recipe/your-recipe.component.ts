import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeShareFormComponent } from '../../recipe-share-form/recipe-share-form.component';
import { Recipe } from '../../model/recipe';
import { ListType } from '../personal-recipe-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-your-recipe',
  templateUrl: './your-recipe.component.html',
  styleUrls: ['./your-recipe.component.css', '../personal-recipe-list.component.css']
})
export class YourRecipeComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, public recipeService: RecipeService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(RecipeShareFormComponent, {
      width: '40%',
      panelClass: 'custom-modalbox',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(recipe => {
      this.recipeService.createRecipe(recipe).subscribe((res: Recipe) => {
        this.recipeService.recipes.unshift(res);
      });

    });
  }
}
