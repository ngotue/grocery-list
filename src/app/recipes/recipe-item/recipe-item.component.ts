import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent {
  @Input() recipe: Recipe
  @Input() id: number

  constructor(private recipesService: RecipesService){}

  ngOnInit(){
  }

  delete() {
    this.recipesService.remove(this.id)
  }

}
