import { Component } from '@angular/core';
import { Ingredient } from 'src/app/common/ingredient.model';
import { GroceriesService } from '../groceries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent {
  groceryList: Ingredient[]
  grocSub = new Subscription()

  constructor(private groceriesService: GroceriesService){}

  ngOnInit() {
    this.groceryList = this.groceriesService.groceryList
    this.grocSub = this.groceriesService.groceriesChange.subscribe(groceries => {
      this.groceryList = groceries
    })
  }

  strike() {

  }

  ngOnDestroy() {
    this.grocSub.unsubscribe()
  }

}
