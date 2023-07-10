import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Ingredient } from "../common/ingredient.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../common/services/data-storage.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class GroceriesResolverService implements Resolve<Ingredient[]>{

    constructor(private dataStorageService: DataStorageService){}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
       return this.dataStorageService.fetchGroceryList()
   }
}