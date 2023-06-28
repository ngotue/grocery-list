import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recSubscription: Subscription
  recipes: Recipe[] = []

  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService){}

  ngOnInit() {
    this.recipes = this.recipesService.recipes
    this.recSubscription = this.recipesService.recipesChange.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    })
  }
  
  onDestroy(){
    this.recSubscription.unsubscribe()
  }
}
