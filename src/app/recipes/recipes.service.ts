import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { INGREDIENT_TYPE, Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  recipesChange = new Subject<Recipe[]>();
  private _recipes: Recipe[]

  get recipes() {
    return this._recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes
    this.recipesChange.next(this._recipes.slice())
  }

  addRecipe(rec: Recipe) {
    this._recipes.push(rec)
    this.recipesChange.next(this._recipes.slice())
  }

  remove(id: number) {
    this._recipes.splice(id, 1)
    this.recipesChange.next(this._recipes.slice())
  }
}
