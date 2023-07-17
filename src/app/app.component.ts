import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeader = true;
  title = 'food-recipe-sharing';
  constructor(private router: Router) {
    // this.router.events.subscribe(event => this.modifyHeader(event));
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)
    ).subscribe(event => this.modifyHeader(event));
  }

  modifyHeader(location: any) { // This method is called many times
    console.log(location.url); // This prints a loot of routes on console
    if (location.url === '/login') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    console.log(this.showHeader);

  }
}
