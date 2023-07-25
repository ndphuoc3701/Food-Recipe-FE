import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { Pagination } from '../model/pagination';
import { RecipeService } from '../service/recipe.service';


export enum ListType {
  Your,
  Learn,
  Favorite,
  Schedule
}

@Component({
  selector: 'app-personal-recipe-list',
  templateUrl: './personal-recipe-list.component.html',
  styleUrls: ['./personal-recipe-list.component.css']
})
export class PersonalRecipeListComponent {
  currentLink!: string;
  constructor(private router: Router, private route: ActivatedRoute, public recipeService: RecipeService) { }
  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.recipeService.selectedPage = +params['page'];
        if (isNaN(this.recipeService.selectedPage)) {
          this.recipeService.selectedPage = 1;
        }
        if (this.router.url.includes('favorite-recipes')) {
          this.currentLink = 'favorite-recipes';
          this.recipeService.getFavoriteRecipesByUserId(2, this.recipeService.selectedPage).subscribe(res => {
            this.getResponse(res);
          });
        }
        else if (this.router.url.includes('your-recipes')) {
          this.currentLink = 'your-recipes';
          this.recipeService.getRecipesByUserId(2, this.recipeService.selectedPage).subscribe(res => {
            this.getResponse(res);
          });
        }
        else if (this.router.url.includes('learnt-recipes')) {
          this.currentLink = 'learnt-recipes';
        }
        else if (this.router.url.includes('schedule-recipes')) {
          this.currentLink = 'schedule-recipes';

        };
      });
  }

  getResponse(res: Pagination<Recipe>) {
    this.recipeService.recipes = res.objects;
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
