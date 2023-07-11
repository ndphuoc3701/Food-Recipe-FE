import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EvaluateComponent } from './recipe-detail/evaluate/evaluate.component';
import { RecipeShareFormComponent } from './recipe-share-form/recipe-share-form.component';
import { YourRecipeComponent } from './your-recipe/your-recipe.component';
import { PersonalRecipeListComponent } from './personal-recipe-list/personal-recipe-list.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, pathMatch: 'full'
  },
  {
    path: 'personal-recipes', component: PersonalRecipeListComponent, children: [
      { path: 'your-recipes', component: YourRecipeComponent }
    ]

  },
  {
    path: 'sharing', component: RecipeShareFormComponent
  },
  {
    path: 'recipes/:id', component: RecipeDetailComponent, children: [
      { path: '', component: EvaluateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
