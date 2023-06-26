import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeItemComponent } from './home-page/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { IntroComponent } from './recipe-detail/intro/intro.component';
import { InstructComponent } from './recipe-detail/instruct/instruct.component';
import { EvaluateComponent } from './recipe-detail/evaluate/evaluate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    IntroComponent,
    InstructComponent,
    EvaluateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
