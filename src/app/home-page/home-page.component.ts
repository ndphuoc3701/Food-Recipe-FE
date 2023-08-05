import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {

        this.selectedPage = +params['page'];
        this.searchIngredient = params['ingredient']
        this.filter = params['filter']
        console.log(this.searchIngredient);

        if (isNaN(this.selectedPage)) {
          this.selectedPage = 1;
        }
        this.recipeService.getRecipesByPage(this.selectedPage).subscribe(res => {
          this.recipes = res.objects;
          this.numPage = res.totalPages;
        });
      });
  }

  recipes!: Recipe[];
  selectedPage: number = 1;
  numPage!: number;
  searchIngredient!: string;
  filter!: string;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  page1() {
    return this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage && this.numPage != 2 ? this.numPage - 2 : this.selectedPage - 1;
  }

  page2() {
    return this.selectedPage == 1 ? 2 : this.selectedPage == this.numPage && this.numPage != 2 ? this.selectedPage - 1 : this.selectedPage;
  }

  page3() {
    return this.selectedPage == this.numPage ? this.selectedPage : this.selectedPage == 1 ? 3 : this.selectedPage + 1;
  }

  searchByIngredient(ingredient: string) {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ingredient: ingredient
      },
      queryParamsHandling: 'merge',
    });
  }

  searchByFilter(filter: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        filter: filter
      },
      queryParamsHandling: 'merge',
    });
  }
}
