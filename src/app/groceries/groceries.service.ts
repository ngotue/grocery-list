import { Injectable } from "@angular/core";
import { Ingredient, Item } from "../common/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class GroceriesService {
    private _groceryList: Item[]
    groceriesChange = new Subject<Item[]>()

    constructor(private http: HttpClient){}

    receiveIngredients(ingredients: Ingredient[]) {
        this._groceryList = ingredients.map(line => ({...line, done: false})).sort((groc1, groc2) => groc1.name.localeCompare(groc2.name))
        this.groceriesChange.next(this._groceryList.slice())
    }

    setGroceryList(groceryList: Item[]) {
        this._groceryList = groceryList
        this.groceriesChange.next(this._groceryList.slice())
    }

    get groceryList() {
        return this._groceryList
    }
}