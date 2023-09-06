import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-gui',
  templateUrl: './admin-gui.component.html',
  styleUrls: ['./admin-gui.component.css']
})
export class AdminGuiComponent {
  isRecipe: boolean = false;
  isUser: boolean = false;
  isEvaluation: boolean = false;
}
