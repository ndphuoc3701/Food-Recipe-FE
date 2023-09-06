import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeDetail } from '../model/recipeDetail';
import { UserInfo } from '../model/user-info';
import { Ingredient } from '../model/ingredient';
import { Instruction } from '../model/instruction';
import { RecipeSharing } from '../model/recipeSharing';
import { Image } from '../model/image';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail!: RecipeDetail;

  ngOnInit(): void {
    // let recipe = new Recipe(1, "Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, "20/5/2023");
    // let userInfo = new UserInfo("Nguyen Duy Phuoc", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", 4.1, 3.5);
    // let ingredients = [new Ingredient("Chanh", "1 trái"),
    // new Ingredient("Bò", "5kg")]
    let recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipeDetailById(recipeId, this.userService.userInfo?.id!).subscribe(recipeDetail => {
      this.recipeDetail = recipeDetail;
    })
  }

  constructor(private recipeService: RecipeService, private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog) { }

  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }

  clickClock(recipeName: string, recipeImage: string, recipeId: number) {
    this.recipeService.openScheduleDialog(recipeName, recipeImage, recipeId);
  }
}
