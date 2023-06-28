import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { INGREDIENT_TYPE, Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  recipesChange = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1, INGREDIENT_TYPE.RAW), new Ingredient('French Fries', 20, INGREDIENT_TYPE.PREPARED)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2, INGREDIENT_TYPE.PREPARED), new Ingredient('Meat', 1, INGREDIENT_TYPE.RAW)]
    ),
  ];

  get recipes() {
    return this._recipes.slice();
  }
  
}
