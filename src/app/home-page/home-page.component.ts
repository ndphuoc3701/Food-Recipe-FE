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
        this.keyword = params['keyword'];
        this.ingredient = params['ingredient']
        this.filter = params['filter']

        if (isNaN(this.selectedPage)) {
          this.selectedPage = 1;
        }
        
        if (this.ingredient==undefined) {
          this.ingredient = '';
        }
        // this.recipeService.getRecipesByPage(this.selectedPage).subscribe(res => {
        //   this.recipes = res.objects;
        //   this.numPage = res.totalPages;
        // });
        this.recipes=[new Recipe(1,'a','b',true,4,5,3),new Recipe(1,'b','b',true,4,5,3)];
        this.numPage=5;
        this.numberPage1 = this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage && this.numPage != 2 ? this.numPage - 2 : this.selectedPage - 1;
        this.numberPage2 = this.selectedPage == 1 ? 2 : this.selectedPage == this.numPage && this.numPage != 2 ? this.selectedPage - 1 : this.selectedPage;
        this.numberPage3 = this.selectedPage == this.numPage ? this.selectedPage : this.selectedPage == 1 ? 3 : this.selectedPage + 1;
      });
  }

  recipes!: Recipe[];
  selectedPage: number = 1;
  numPage!: number;
  ingredient: string='';
  filter!: string;
  keyword!: string;
  numberPage1!:number;
  numberPage2!:number;
  numberPage3!:number;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  // page1() {
  //   return this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage && this.numPage != 2 ? this.numPage - 2 : this.selectedPage - 1;
  // }
  page1() {
    this.numberPage1 = this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage && this.numPage != 2 ? this.numPage - 2 : this.selectedPage - 1;
  }

  page2() {
    this.numberPage2 = this.selectedPage == 1 ? 2 : this.selectedPage == this.numPage && this.numPage != 2 ? this.selectedPage - 1 : this.selectedPage;
  }

  page3() {
    this.numberPage3 = this.selectedPage == this.numPage ? this.selectedPage : this.selectedPage == 1 ? 3 : this.selectedPage + 1;
  }

  searchByIngredient(ingredient: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ingredient: this.ingredient.includes(ingredient) ?this.ingredient.replace(' '+ingredient,'') : this.ingredient.concat(" "+ingredient)
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

  searchByKeyword() {
    this.recipeService.getRecipeByKeyWord(this.keyword, this.ingredient, this.filter, this.selectedPage);
  }

  directPage(page:number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge',
    });
  }
}
