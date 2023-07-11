import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }
  close() {
    this.dialogRef.close();
  }
}
