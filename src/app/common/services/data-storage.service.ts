import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Ingredient } from '../ingredient.model';
import { GroceriesService } from 'src/app/groceries/groceries.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private groceriesService: GroceriesService
  ) {}

  storeRecipes() {
    this.http
      .put(
        'https://grocery-list-d47e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        this.recipesService.recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://grocery-list-d47e6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((data) =>
          data.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }))
        ),
        tap((data) => {
          this.recipesService.setRecipes(data);
        })
      );
  }

  storeGroceries() {
    this.http.put('https://grocery-list-d47e6-default-rtdb.europe-west1.firebasedatabase.app/groceries.json',
      this.groceriesService.groceryList
    ).subscribe()
  }

  fetchGroceryList() {
    return this.http
      .get<Ingredient[]>(
        'https://grocery-list-d47e6-default-rtdb.europe-west1.firebasedatabase.app/groceries.json'
      )
      .pipe(
        tap((data) => {
          this.groceriesService.setGroceryList(data);
        })
      );
  }
}
