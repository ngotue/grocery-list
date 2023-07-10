import { Injectable } from "@angular/core";
import { Ingredient } from "../common/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class GroceriesService {
    private _groceryList: Ingredient[]
    groceriesChange = new Subject<Ingredient[]>()

    constructor(private http: HttpClient){}

    setGroceryList(groceries: Ingredient[]) {
        this._groceryList = groceries
        this.groceriesChange.next(this._groceryList.slice())
    }

    get groceryList() {
        return this._groceryList
    }
}