import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/common/services/data-storage.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent {
  recipeForm: FormGroup;
  recipe: Recipe;
  id: number;
  isEdit = false;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.recipes[this.id];
      this.isEdit = params['id'] !== undefined;
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray<any>([]);

    if (this.isEdit) {
      recipeName = this.recipe.name;
      recipeDescription = this.recipe.description;
      recipeImagePath = this.recipe.imagePath;
      this.recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, Validators.required),
          })
        );
      });
    } else {
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null, Validators.required),
        })
      );
    }

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

  save(leave?: boolean) {
    if (!this.recipeForm.valid) return;
    const recipe = this.recipeForm.value;
    this.recipesService.addRecipe(
      this.id,
      new Recipe(
        recipe.name,
        recipe.description,
        recipe.imagePath,
        recipe.ingredients
      )
    );
    this.dataStorageService.storeRecipes();
    if (leave) this.router.navigate(['../']);
    return false;
  }
}
