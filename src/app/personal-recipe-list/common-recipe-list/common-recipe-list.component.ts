import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ListType } from '../personal-recipe-list.component';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router';

export class ClassName {
  readonly ListType = ListType;
}

@Component({
  selector: 'app-common-recipe-list',
  templateUrl: './common-recipe-list.component.html',
  styleUrls: ['./common-recipe-list.component.css', '../../recipe-detail/recipe-detail.component.css']
})
export class CommonRecipeListComponent implements OnInit {
  ngOnInit(): void {
    this.isClock = !this.router.url.includes('scheduled-recipes');
  }

  constructor(private recipeService: RecipeService, private router: Router) { }
  @Input() recipe!: Recipe;
  favoriteHover: boolean = false;
  date!: string;
  isClock: boolean = false;
  note: boolean = false;
  toFix(n: number): string {
    let m = n / 1000;
    return m.toFixed(1);
  }

  mouseEnterFavorite() {
    this.favoriteHover = true;
  }

  mouseLeaveFavorite() {
    this.favoriteHover = false;
  }

  clickFavorite() {
    this.recipe.favorite = !this.recipe.favorite;
    this.favoriteHover = false
  }

  clickClock(event: any, recipeName: string, recipeImage: string) {
    event.stopImmediatePropagation();
    this.recipeService.openScheduleDialog(recipeName, recipeImage);
  }
}
