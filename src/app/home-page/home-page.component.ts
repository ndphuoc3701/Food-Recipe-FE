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
        if (isNaN(this.selectedPage)) {
          this.selectedPage = 1;
        }
        this.recipeService.getRecipesByPage(this.selectedPage).subscribe(res => {
          this.recipes = res.objects;
          this.numPage = res.totalPages;
        });
      });
  }
  // recipes: Recipe[] = [
  //   new Recipe(1, "Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, ''),
  //   new Recipe(2, "Heo hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, ''),
  //   new Recipe(3, "Gà hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", false, 4.15, 923, 50, ''),
  //   new Recipe(4, "Vịt hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", true, 4.75, 75, 50, ''),
  //   new Recipe(5, "Vịt hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", true, 3.65, 19021, 50, ''),

  // ]
  recipes!: Recipe[];
  selectedPage: number = 1;
  numPage!: number;

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
}
