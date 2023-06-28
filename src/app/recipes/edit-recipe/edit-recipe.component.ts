import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {
  recipeForm: FormGroup

  ngOnInit() {
    let recipeName = ''
    let recipeDescription = ''
    let recipeImagePath = ''

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath),
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value)
    return false
  }
}
