import { Component } from '@angular/core';
import { Item } from 'src/app/common/ingredient.model';
import { GroceriesService } from '../groceries.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/common/services/data-storage.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent {
  groceryList: Item[]
  grocSub = new Subscription()

  constructor(private groceriesService: GroceriesService, private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.groceryList = this.groceriesService.groceryList
    this.grocSub = this.groceriesService.groceriesChange.subscribe(groceries => {
      this.groceryList = groceries
    })
  }

  toggleStrike(id: number) {
    this.groceryList[id].done = !this.groceryList[id].done
    this.groceriesService.setGroceryList(this.groceryList)
    this.dataStorageService.storeGroceries()
  }

  ngOnDestroy() {
    this.grocSub.unsubscribe()
  }

}
