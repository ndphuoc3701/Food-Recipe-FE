import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/model/evaluation';


import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserInfo } from 'src/app/model/user-info';
import { UserComment } from 'src/app/model/userComment';
import { ActivatedRoute } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  numPage: number = 5;
  selectedPage: number = 1;
  recipeId!: number;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.selectedPage = +params['page'];
        if (isNaN(this.selectedPage)) {
          this.selectedPage = 1;
        }
        if (this.selectedPage == 2) {
          this.communityEvaluation = [new Evaluation(1, 'ngon', 4, new UserInfo('Nguyen Duy Phong', '/assets/icon/cooker.png'), '3/7/2023 20:00', 100, 50, [], []),
          new Evaluation(1, 'dở', 4.4, new UserInfo('Nguyen Ngoc Bao Anh', '/assets/icon/cookLevel.png'), '3/7/2023 21:00', 100, 50, [], ['/assets/icon/cooker.png', '/assets/icon/cookLevel.png'])];

        }
        if (this.selectedPage == 1) {
          this.communityEvaluation = [new Evaluation(1, 'ngon', 4, new UserInfo('Nguyen Duy Phuoc', '/assets/icon/cooker.png'), '3/7/2023 20:00', 100, 50, [], []),
          new Evaluation(1, 'dở', 4.4, new UserInfo('Nguyen Ngoc Bao Han', '/assets/icon/cookLevel.png'), '3/7/2023 21:00', 100, 50, [], ['/assets/icon/cooker.png', '/assets/icon/cookLevel.png'])];

        }
      });
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];

    })
    this.communityEvaluation.forEach(e => {
      e.images.forEach(i => {
        var reader = new FileReader();
        reader.readAsDataURL(i);

        reader.onload = (_event) => {
          e.imageUrls.push(reader.result! as string);
        }
      })

    })

  }

  evaluation!: Evaluation;
  imageUrls: string[] = ['/assets/icon/evaluateLevel.png'];
  userComment: UserComment = new UserComment(1, 'Dung', new UserInfo('Nguyen Duy Khanh', '/assets/icon/cookLevel.png'), 'Be Meo', '3/7/2023 21:00');
  communityEvaluation: Evaluation[] = [new Evaluation(1, 'ngon', 4, new UserInfo('Nguyen Duy Phuoc', '/assets/icon/cooker.png'), '3/7/2023 20:00', 100, 50, [], []),
  new Evaluation(1, 'dở', 4.4, new UserInfo('Nguyen Ngoc Bao Han', '/assets/icon/cookLevel.png'), '3/7/2023 21:00', 100, 50, [], ['/assets/icon/cooker.png', '/assets/icon/cookLevel.png'])];

  // constructor(private imageService: ImageService){}

  @ViewChild('evaluationInput') evaluationInputRef!: ElementRef;
  starHovered: number = -1;

  removeImage(imgUrlIdx: number) {
    this.imageUrls.splice(imgUrlIdx, 1);
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
    }
    else {
      evaluation.isLike = true;
    }
  }

  clickDislike(evaluation: Evaluation) {
    if (evaluation.isLike == false) {
      evaluation.isLike = undefined;
    }
    else {
      evaluation.isLike = false;
    }
  }

  submit() {
    //     var reader = new FileReader();
    //     var fileByteArray = [];
    //     reader.readAsArrayBuffer(myFile);
    //     reader.onloadend = function (evt) {
    //     if (evt.target.readyState == FileReader.DONE) {
    //        var arrayBuffer = evt.target.result,
    //            array = new Uint8Array(arrayBuffer);
    //        for (var i = 0; i < array.length; i++) {
    //            fileByteArray.push(array[i]);
    //         }
    //     }
    // }
  }

  uploadImage() {
    if (this.imageUrls.length > 4) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { name: 'austin' },
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
        this.imageUrls.push(reader.result! as string);
      }
    };
    input.click();
  }

  bin2String(array: number[]) {
    return String.fromCharCode.apply(String, array);
  }

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


