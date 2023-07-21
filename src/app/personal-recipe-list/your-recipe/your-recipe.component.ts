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
    if (this.router.url.includes('favorite-recipes')) {
      this.listType = ListType.Favorite;
      this.recipes = [new Recipe(1, "Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '20/5/2023'),
      new Recipe(2, "Heo hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '21/6/2023')];
    }
    else {
      this.listType = ListType.Your;
      this.recipes = [new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023'),
      new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023')];
    };
  }

  listType!: ListType;

  recipes!: Recipe[];
  constructor(private dialog: MatDialog, private router: Router, private recipeService: RecipeService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(RecipeShareFormComponent, {
      width: '40%',
      panelClass: 'custom-modalbox',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(recipe => {
      this.recipeService.createRecipe(recipe).subscribe();

    });
  }
}
