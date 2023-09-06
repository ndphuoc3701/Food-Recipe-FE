import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/model/evaluation';


import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserInfo } from 'src/app/model/user-info';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/model/image';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { EvaluationRequest } from 'src/app/request/evaluation';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  numPage!: number;
  selectedPage: number = 1;
  recipeId!: number;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private evaluationService: EvaluationService) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selectedPage = +params['page'];
        if (isNaN(this.selectedPage)) {
          this.selectedPage = 1;
        }
        this.route.params.subscribe((params) => {
          this.recipeId = +params['id'];
          this.evaluationService.getEvaluationsByRecipeId(this.recipeId, this.selectedPage).subscribe(res => {
            this.communityEvaluation = res.objects;
            this.numPage = res.totalPages;
          });
        })
      });
  }

  images: Image[] = [];
  communityEvaluation!: Evaluation[]

  @ViewChild('evaluationInput') evaluationInputRef!: ElementRef;
  starHovered: number = -1;

  starSelected: number = -1;

  note!: string;

  content!: string;

  removeImage(imgUrlIdx: number) {
    this.images.splice(imgUrlIdx, 1);
  }

  hoverStar(n: number) {
    this.starHovered = n;
  }

  unhoverStar() {
    this.starHovered = -1;
  }

  clickLike(evaluation: Evaluation) {
    if (evaluation.isLike) {
      evaluation.isLike = undefined;
      evaluation.numLike--;
    }
    else {
      evaluation.numLike++;
      evaluation.isLike = true;
      this.evaluationService.likeEvaluation(evaluation.id, true).subscribe();
    }
  }

  clickDislike(evaluation: Evaluation) {
    if (evaluation.isLike == false) {
      evaluation.isLike = undefined;
      evaluation.numDislike--;
    }
    else {
      evaluation.numDislike++;
      evaluation.isLike = false;
      this.evaluationService.likeEvaluation(evaluation.id, false).subscribe();
    }
  }

  uploadImage() {
    if (this.images.length > 4) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        data: { text: 'Bạn chỉ có thể đăng tối đa 5 bức ảnh thôi nhé!!' },
      });
      return;
    }
    let input = document.createElement('input');
    input.type = 'file';
    input.addEventListener
    input.onchange = event => {
      let file = (event.target as HTMLInputElement).files![0]
      if (!file || file.length == 0) {
        alert('You must select an image');
        return;
      }

      var mimeType = file.type;

      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.images.push(new Image(reader.result! as string));
      }
    };
    input.click();
  }

  selectStar(n: number) {
    this.starSelected = n;
  }

  page1() {
    return this.selectedPage == 1 ? 1 : this.selectedPage == this.numPage && this.numPage != 2 ? this.numPage - 2 : this.selectedPage - 1
  }

  page2() {
    return this.selectedPage == 1 ? 2 : this.selectedPage == this.numPage && this.numPage != 2 ? this.selectedPage - 1 : this.selectedPage
  }

  page3() {
    return this.selectedPage == this.numPage ? this.selectedPage : this.selectedPage == 1 ? 3 : this.selectedPage + 1
  }

  submit() {
    if (this.starSelected == -1) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        data: { text: 'Vui lòng chọn số sao bạn nhé!!' }
      });
      return;
    }
    let evaluationRequest = new EvaluationRequest(1, this.recipeId, this.starSelected + 1, this.content, this.note, this.images);
    this.evaluationService.createEvaluation(evaluationRequest).subscribe(evaluation => this.communityEvaluation.unshift(evaluation));
  }

}


