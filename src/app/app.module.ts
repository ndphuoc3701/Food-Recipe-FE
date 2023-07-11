import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeItemComponent } from './home-page/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IntroComponent } from './recipe-detail/intro/intro.component';
import { EvaluateComponent } from './recipe-detail/evaluate/evaluate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RecipeShareFormComponent } from './recipe-share-form/recipe-share-form.component';
import { YourRecipeComponent } from './your-recipe/your-recipe.component';
import { CommonRecipeListComponent } from './common-recipe-list/common-recipe-list.component';
import { PersonalRecipeListComponent } from './personal-recipe-list/personal-recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    IntroComponent,
    EvaluateComponent,
    DialogComponent,
    RecipeShareFormComponent,
    YourRecipeComponent,
    CommonRecipeListComponent,
    PersonalRecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
