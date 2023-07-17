import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ListType } from '../personal-recipe-list.component';

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
    this.isClock = this.recipe.scheduledDate == null;
    // switch (this.listType) {


    //   case ListType.Your: {
    //     this.date = 'Đăng ngày ' + this.recipe.createdDate;
    //     break;
    //   }
    //   case ListType.Favorite: {
    //     this.date = 'Đăng ngày ' + this.recipe.createdDate;
    //     this.isClock = true;
    //     break;
    //   }
    //   case ListType.Learn: {
    //     this.date = 'Học ngày ' + this.recipe.learntDate;
    //     this.isClock = true;
    //     break;
    //   }
    //   case ListType.Schedule: {
    //     this.date = 'Lên lịch ngày ' + this.recipe.scheduledDate;
    //     break;
    //   }
    // }
  }
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
}
