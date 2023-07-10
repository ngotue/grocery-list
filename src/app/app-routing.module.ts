import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { GroceryListComponent } from './groceries/grocery-list/grocery-list.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { GroceriesResolverService } from './groceries/groceries-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { recipes: RecipesResolverService },
    children: [
      { path: '', component: RecipeListComponent },
      { path: 'new', component: EditRecipeComponent, pathMatch: 'full' },
      { path: ':id/edit', component: EditRecipeComponent, pathMatch: 'full' },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
  { path: 'groceries', component: GroceryListComponent, resolve: {groceries: GroceriesResolverService} },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
