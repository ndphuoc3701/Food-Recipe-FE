import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe';


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
  constructor(private router: Router) { }
  ngOnInit(): void {
    if (this.router.url.includes('favorite-recipes')) {
      this.listType = ListType.Favorite;
      this.recipes = [new Recipe(1, "Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '20/5/2023', '20/5/2023', '20/5/2023'),
      new Recipe(2, "Heo hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '21/6/2023', '20/5/2023', '20/5/2023')];
    }
    else if (this.router.url.includes('your-recipes')) {
      this.listType = ListType.Your;
      this.recipes = [new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023', '20/5/2023', '20/5/2023'),
      new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023', '20/5/2023', '20/5/2023')];
    }
    else if (this.router.url.includes('learnt-recipes')) {
      this.listType = ListType.Learn;
      this.recipes = [new Recipe(1, "Cá hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023', '20/5/2023', '20/5/2023'),
      new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023', '20/5/2023', '20/5/2023')];
    }
    else if (this.router.url.includes('schedule-recipes')) {
      this.listType = ListType.Schedule;
      this.recipes = [new Recipe(1, "Gà hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023', '20/5/2023', '20/5/2023'),
      new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023', '20/5/2023', '20/5/2023')];
    };
  }

  listType!: ListType;

  recipes!: Recipe[];
}
