import { Component, OnInit } from '@angular/core';
import { RecipeSharing } from '../model/recipeSharing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../model/ingredient';
import { Instruction } from '../model/instruction';
import { DialogComponent } from '../dialog/dialog.component';
import { RecipeService } from '../service/recipe.service';
import { EMPTY_IMAGE_MESSAGE_ERROR, EMPTY_MESSAGE_ERROR } from '../Constant';
import { Image } from '../model/image';


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
  }
  recipe: RecipeSharing = new RecipeSharing('', '', [new Ingredient('', '')], [new Instruction('', 1, [])], 2);
  invalid: boolean = true;
  onSubmit() {
    if (!this.validateInput()) return;
    this.dialogRef.close(this.recipe);
  }

  validateInput() {
    this.validateName();
    let validateInstruction = true;
    for (let i = 0; i < this.recipe.instructions.length; i++) {
      if (!this.validateInstruction(i)) {
        validateInstruction = false;
      };
    }
    let validateIngredient = true;
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (!this.validateIngredient(i)) {
        validateIngredient = false;
      }
    }
    this.validateImage();
    console.log(this.validate);

    if (!this.validate.name || !this.validate.image || !validateInstruction || !validateIngredient) {
      return false;
    }
    return true;
  }

  validateName() {
    if (this.recipe.name == '') {
      this.validate.name = false;
    }
    else this.validate.name = true;
    return this.validate.name;
  }

  validateIngredient(ingredientIndex: number) {
    let validate = true;
    if (this.recipe.ingredients[ingredientIndex].quantity == '' || this.recipe.ingredients[ingredientIndex].name == '') {
      this.validate.ingredients[ingredientIndex] = false;
      validate = false;
    }
    else this.validate.ingredients[ingredientIndex] = true;
    return validate;
  }

  validateInstruction(instructionIndex: number) {
    let validate = true;
    if (this.recipe.instructions[instructionIndex].content == '') {
      this.validate.instructions[instructionIndex] = false;
      validate = false;
    }
    else this.validate.instructions[instructionIndex] = true;
    return validate;
  }

  validateImage() {
    if (this.recipe.image == '')
      this.validate.image = false;
    else this.validate.image = true;
    return this.validate.image;
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
    this.recipe.instructions.push(new Instruction('', this.recipe.instructions.length + 1, []));
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
        autoFocus: false,
        data: { text: 'Bạn chỉ có thể đăng tối đa 5 bức ảnh thôi nhé!!' },
      });

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
          this.recipe.instructions[instructionIndex].images.push(new Image(reader.result! as string));
        else this.recipe.image = reader.result! as string;
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
