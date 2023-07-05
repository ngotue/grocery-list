import { Injectable } from "@angular/core";
import { Ingredient } from "../common/ingredient.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class GroceriesService {
    _groceryList: Ingredient[]

    constructor(private http: HttpClient){}

    setGroceryList(groceries: Ingredient[]) {
        this._groceryList = groceries
    }

    get groceryList() {
        return this._groceryList
    }
}