import { Component, OnInit } from '@angular/core';
import { RecipeSharing } from '../model/recipeSharing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../model/ingredient';
import { Instruction } from '../model/instruction';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { RecipeService } from '../service/recipe.service';
import { EMPTY_IMAGE_MESSAGE_ERROR, EMPTY_MESSAGE_ERROR } from '../Constant';


interface ValidateIngredient {
  name: boolean,
  quantity: boolean
}

@Component({
  selector: 'app-recipe-share-form',
  templateUrl: './recipe-share-form.component.html',
  styleUrls: ['./recipe-share-form.component.css']
})
export class RecipeShareFormComponent implements OnInit {
  // form!: FormGroup;
  EMPTY_MESSAGE_ERROR: string = EMPTY_MESSAGE_ERROR;
  EMPTY_IMAGE_MESSAGE_ERROR: string = EMPTY_IMAGE_MESSAGE_ERROR;

  validate: { name: boolean, ingredients: boolean[], instructions: boolean[], image: boolean } = {
    name: true,
    ingredients: [true],
    instructions: [true],
    image: true
  }

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<RecipeShareFormComponent>, private recipeService: RecipeService) { }
  ngOnInit(): void {
    // this.form = this.fb.group({
    //   name: this.recipe.name,
    //   instruction1: this.recipe.instructions[0].step
    // })

  }
  recipe: RecipeSharing = new RecipeSharing('', '', [new Ingredient('', '')], [new Instruction('', [])]);
  invalid: boolean = true;
  onSubmit() {
    console.log(this.recipe);
    this.validateInput();
  }

  validateInput() {
    this.validateName();
    for (let i = 0; i < this.recipe.instructions.length; i++) {
      this.validateInstruction(i);
    }
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      this.validateIngredient(i);
    }
    this.validateImage();
  }

  validateName() {
    if (this.recipe.name == '') {
      this.validate.name = false;
    }
    else this.validate.name = true;
  }

  validateIngredient(ingredientIndex: number) {
    if (this.recipe.ingredients[ingredientIndex].quantity == '' || this.recipe.ingredients[ingredientIndex].name == '')
      this.validate.ingredients[ingredientIndex] = false;
    else this.validate.ingredients[ingredientIndex] = true;
  }

  validateInstruction(instructionIndex: number) {
    if (this.recipe.instructions[instructionIndex].step == '')
      this.validate.instructions[instructionIndex] = false;
    else this.validate.instructions[instructionIndex] = true;
  }

  validateImage() {
    if (this.recipe.image == '')
      this.validate.image = false;
    else this.validate.image = true;
  }
  addIngredient() {
    this.recipe.ingredients.push(new Ingredient('', ''));
    this.validate.ingredients.push(true);
  }

  removeIngredient(ingredientIndex: number) {
    this.recipe.ingredients.splice(ingredientIndex, 1);
    this.validate.ingredients.splice(ingredientIndex, 1);
  }

  addInstruction() {
    this.recipe.instructions.push(new Instruction('', []));
    this.validate.instructions.push(true);
  }

  removeInstruction(instructionIndex: number) {
    this.recipe.instructions.splice(instructionIndex, 1);
  }

  addInstructionImage(instructionIndex: number) {
    let lengthImage = this.recipe.instructions[instructionIndex].images.length
    if (lengthImage > 4) {
      let dialogRef = this.dialog.open(DialogComponent, {
        width: '20%',
        autoFocus: false
      });
      return;
    }
    this.uploadImage(instructionIndex);
  }

  uploadImage(instructionIndex: number | null) {
    let image = '';
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
        if (instructionIndex != null)
          this.recipe.instructions[instructionIndex].images.push(reader.result! as string);
        else this.recipe.image = reader.result! as string;
        // this.recipeService.postImage(reader.result as string).subscribe(
        //   res => {
        //     console.log(res.encodedImage);
        //     this.recipe.instructions[1].images.push(res.encodedImage);
        //   }
        // )
        console.log('lol');

        console.log(reader.result);

      }
    };
    input.click();
    return image;
  }

  removeInstructionImage(instructionIndex: number, imageIndex: number) {
    this.recipe.instructions[instructionIndex].images.splice(imageIndex, 1);
  }

  addRecipeImage() {
    this.recipe.image = this.uploadImage(null);
  }



}
