import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { Pagination } from '../model/pagination';
import { RecipeService } from '../service/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LearntRecipe } from '../model/learntRecipe';
import { RecipeShareFormComponent } from '../recipe-share-form/recipe-share-form.component';
import { UserService } from '../service/user.service';
import { ScheduleRecipe } from '../model/scheduleRecipe';


export enum ListType {
  Your,
  Learn,
  Favorite,
  Schedule
}

@Component({
  selector: 'app-personal-recipe-list',
  templateUrl: './personal-recipe-list.component.html',
  styleUrls: ['./personal-recipe-list.component.css', '../recipe-detail/recipe-detail.component.css']
})
export class PersonalRecipeListComponent {
  currentLink!: string;
  constructor(private router: Router, private route: ActivatedRoute, public recipeService: RecipeService, private dialog: MatDialog, private userService: UserService) { }
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.route.queryParams
          .subscribe(params => {
            this.recipeService.selectedPage = +params['page'];
            if (isNaN(this.recipeService.selectedPage)) {
              this.recipeService.selectedPage = 1;
            }
            if (this.router.url.includes('favorite-recipes')) {
              this.currentLink = 'favorite-recipes';
              this.recipeService.getFavoriteRecipesByUserId(this.userService.userInfo?.id!, this.recipeService.selectedPage).subscribe(res => {
                this.getResponse(res);
              });
            }
            else if (this.router.url.includes('your-recipes')) {
              this.currentLink = 'your-recipes';
              this.recipeService.getRecipesByUserId(this.userService.userInfo?.id!, this.recipeService.selectedPage).subscribe(res => {
                this.getResponse(res);
              });
            }
            else if (this.router.url.includes('learnt-recipes')) {
              this.currentLink = 'learnt-recipes';
              this.recipeService.getLearningRecipesByUserId(this.userService.userInfo?.id!, this.recipeService.selectedPage).subscribe(res => {
                this.getLearntResponse(res);
              });
            }
            else if (this.router.url.includes('scheduled-recipes')) {
              // this.currentLink = 'scheduled-recipes';
              // let old = params['old'] != undefined;
              console.log('cm');

              this.recipeService.getScheduleRecipesByUserId(false, this.userService.userInfo?.id!, this.recipeService.selectedPage).subscribe(res => {
                this.getScheduleResponse(res);
              });
            };
          });
      }

    })
  }

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

  getResponse(res: Pagination<Recipe>) {
    this.recipeService.recipes = res.objects;
    this.recipeService.numPage = res.totalPages;
  }

  getLearntResponse(res: Pagination<LearntRecipe>) {
    this.recipeService.learntRecipes = res.objects;
    this.recipeService.numPage = res.totalPages;
  }

  getScheduleResponse(res: Pagination<ScheduleRecipe>) {
    this.recipeService.scheduleRecipes = res.objects;
    this.recipeService.numPage = res.totalPages;
  }

  page1() {
    return this.recipeService.selectedPage == 1 ? 1 : this.recipeService.selectedPage == this.recipeService.numPage && this.recipeService.numPage != 2 ? this.recipeService.numPage - 2 : this.recipeService.selectedPage - 1;
  }

  page2() {
    return this.recipeService.selectedPage == 1 ? 2 : this.recipeService.selectedPage == this.recipeService.numPage && this.recipeService.numPage != 2 ? this.recipeService.selectedPage - 1 : this.recipeService.selectedPage;
  }

  page3() {
    return this.recipeService.selectedPage == this.recipeService.numPage ? this.recipeService.selectedPage : this.recipeService.selectedPage == 1 ? 3 : this.recipeService.selectedPage + 1;
  }
}
