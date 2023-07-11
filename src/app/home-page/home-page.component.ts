import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { ActivatedRoute, Router } from '@angular/router';

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
      });
  }
  recipes: Recipe[] = [
    new Recipe("Bò hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", true, 4.25, 1002, 50, ''),
    new Recipe("Heo hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", false, 3.25, 1102, 50, ''),
    new Recipe("Gà hầm", "/assets/recipe/z4459769511231_d02634b64001a6d17160e0527af636c0.jpg", false, 4.15, 923, 50, ''),
    new Recipe("Vịt hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", true, 4.75, 75, 50, ''),
    new Recipe("Vịt hầm", "/assets/recipe/z4459772476120_e4ad895886890eebd49855cbfe6baa39.jpg", true, 3.65, 19021, 50, ''),

  ]

  selectedPage: number = 1;
  numPage: number = 5;

  constructor(private router: Router, private route: ActivatedRoute) { }

  page1() {
    return this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage ? this.numPage - 2 : this.selectedPage - 1
  }

  page2() {
    return this.selectedPage == 1 ? 2 : this.selectedPage == this.numPage ? this.selectedPage - 1 : this.selectedPage
  }

  page3() {
    return this.selectedPage == this.numPage ? this.selectedPage : this.selectedPage == 1 ? 3 : this.selectedPage + 1
  }
}
