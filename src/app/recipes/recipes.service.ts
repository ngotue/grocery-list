import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { INGREDIENT_TYPE, Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';
import { GroceriesService } from '../groceries/groceries.service';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  recipesChange = new Subject<Recipe[]>();
  private _recipes: Recipe[]

  constructor(private groceriesService: GroceriesService){}

  get recipes() {
    return this._recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes
    this.recipesChange.next(this._recipes.slice())
  }

  addRecipe(id: number, rec: Recipe) {
    if(this._recipes[id]) this._recipes[id] = rec
    else this._recipes.push(rec)
    this.recipesChange.next(this._recipes.slice())
  }

  sendAll(){
    const ingredientList = this.recipes.flatMap(rec => rec.ingredients)
    this.groceriesService.receiveIngredients(ingredientList)
  }

  remove(id: number) {
    this._recipes.splice(id, 1)
    this.recipesChange.next(this._recipes.slice())
  }
}
