import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EvaluateComponent } from './recipe-detail/evaluate/evaluate.component';
import { RecipeShareFormComponent } from './recipe-share-form/recipe-share-form.component';
import { YourRecipeComponent } from './personal-recipe-list/your-recipe/your-recipe.component';
import { PersonalRecipeListComponent } from './personal-recipe-list/personal-recipe-list.component';
import { LearntRecipeComponent } from './personal-recipe-list/learnt-recipe/learnt-recipe.component';
import { ScheduleRecipeComponent } from './personal-recipe-list/schedule-recipe/schedule-recipe.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminGuiComponent } from './admin-gui/admin-gui.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'sign-up', component: LoginComponent
  },
  {
    path: 'admin-gui', component: AdminGuiComponent
  },
  {
    path: 'personal-recipes', component: PersonalRecipeListComponent, children: [
      { path: 'your-recipes', component: YourRecipeComponent },
      { path: 'favorite-recipes', component: YourRecipeComponent },
      { path: 'learnt-recipes', component: LearntRecipeComponent },
      { path: 'scheduled-recipes', component: ScheduleRecipeComponent }

    ]
  }
  ,
  {
    path: 'sharing', component: RecipeShareFormComponent
  },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, children: [
      { path: '', component: EvaluateComponent }
    ]
  },
  {
    path: 'users/:id', component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
