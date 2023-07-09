import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/common/services/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchRecipes();
    this.route.data.subscribe((data: Data) => {
      this.recipes = data['recipes'];
    });
    this.recSubscription = this.recipesService.recipesChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
  
  sendAllIngredients(){
    this.recipesService.sendAll()
    this.dataStorageService.storeGroceries()
  }

  onDestroy() {
    this.recSubscription.unsubscribe();
  }
}
