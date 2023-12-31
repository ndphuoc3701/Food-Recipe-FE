import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ListType } from '../personal-recipe-list.component';
import { Recipe } from 'src/app/model/recipe';
import { LearntRecipe } from 'src/app/model/learntRecipe';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleRecipe } from 'src/app/model/scheduleRecipe';
import { ScheduleRecipeFormComponent } from 'src/app/edit-personal-recipe/edit-personal-recipe.component';
import { RecipeService } from 'src/app/service/recipe.service';
import { ScheduleRequest } from 'src/app/request/schedule-request';
import { UserService } from 'src/app/service/user.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Pagination } from 'src/app/model/pagination';
@Component({
  selector: 'app-schedule-recipe',
  templateUrl: './schedule-recipe.component.html',
  styleUrls: ['./schedule-recipe.component.css', '../personal-recipe-list.component.css']
})
export class ScheduleRecipeComponent implements OnInit {

  old: boolean = false;
  listType: ListType = ListType.Schedule;
  // scheduleRecipes: ScheduleRecipe[] = [
  //   new ScheduleRecipe(1, new Recipe(1, "Heo hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, '21/6/2023'), 'Thêm muối', '21/6/2023 18:30'),
  //   new ScheduleRecipe(2, new Recipe(2, "Bò hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, '20/5/2023'), 'Thêm mắm', '21/6/2023 18:30')
  // ];
  // scheduleRecipes!: LearntRecipe[];

  constructor(private dialog: MatDialog, public recipeService: RecipeService, private userService: UserService, @Inject(LOCALE_ID) private locale: string, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params); // { orderby: "price" }
    //     this.old = params['old'];
    //     if (this.old == undefined) this.old = 'false';
    //     console.log(this.old); // price
    //   }
    //   );
  }

  clickOld(isOld: boolean) {
    this.recipeService.selectedPage = 1;
    this.recipeService.getScheduleRecipesByUserId(isOld, this.userService.userInfo?.id!, this.recipeService.selectedPage).subscribe(res => { this.getScheduleResponse(res) });
    this.old = isOld;
  }

  getScheduleResponse(res: Pagination<ScheduleRecipe>) {
    this.recipeService.scheduleRecipes = res.objects;
    this.recipeService.numPage = res.totalPages;
  }

  lol(event: any) {
    event.stopImmediatePropagation();
  }
  edit(event: any, recipeIdx: number, scheduleRecipe: ScheduleRecipe) {
    event.stopImmediatePropagation();
    this.openEditDialog(recipeIdx, scheduleRecipe.scheduleTime!, scheduleRecipe.note!, scheduleRecipe.recipe);

  }
  openEditDialog(recipeIdx: number, scheduleDate: string, note: string, scheduleRecipe: Recipe): void {

    const dialogRef = this.dialog.open(ScheduleRecipeFormComponent, {
      width: '30%',
      panelClass: 'custom-modalbox',
      data: {
        title: 'Chỉnh sửa công thức đã lên lịch',
        recipeIdx: recipeIdx,
        scheduledDate: '2023-07-15T18:48',
        recipeId: scheduleRecipe.id,
        recipeName: scheduleRecipe.name,
        recipeImage: scheduleRecipe.image,
        note: note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let formatDated = formatDate(result.scheduledTime, 'yyyy-MM-dd HH:mm', this.locale);
      this.recipeService.scheduleRecipes[result.recipeIdx].scheduleTime = formatDated;
      this.recipeService.scheduleRecipes[result.recipeIdx].note = result.note;
      let scheduleRequest = new ScheduleRequest(this.userService.userInfo?.id!, result.recipeId, result.note, formatDated);
      this.recipeService.updateScheduleRecipe(scheduleRequest).subscribe();
      console.log(scheduleRequest);

    });
  }
}
