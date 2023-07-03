import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent {
  recipeForm: FormGroup;
  isEdit = false;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray<any>([]);

    recipeIngredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients,
    });
  }

  get ingredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  removeIngredientInput(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  save() {
    const recipe = this.recipeForm.value;
    this.recipesService.addRecipe(
      new Recipe(
        recipe.name,
        recipe.description,
        recipe.imagePath,
        recipe.ingredients
      )
    );
  }

  saveAndStay() {
    if (!this.recipeForm.valid) return
    this.save();
    return false;
  }

  saveAndLeave() {
    if (!this.recipeForm.valid) return
    this.save();
    this.router.navigate(['../']);
  }
}
