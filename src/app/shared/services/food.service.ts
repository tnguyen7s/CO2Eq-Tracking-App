import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Meal } from "../models/meal.model";

@Injectable({
  providedIn: "root"
})

export class FoodService{
  private cache: {
    [date: string]:{
      [meal:string]: Meal
    }
  } = {};

  // event is triggered when wanting to empty the plate
  public resetPlate = new Subject<boolean>();

  // event is triggered when wanting to set the food plate
  public setPlate = new Subject<boolean>();

  // CREATE ONE
  addMealToCache(foodList: string[], totalEco2InKg: number, date: string, meal:string)
  {
    const mealObj = new Meal(foodList.slice(), totalEco2InKg, date, meal);
    if (!this.cache[date]){
      this.cache[date] = {};
    }

    this.cache[date][meal] = mealObj;
  }

  //READ ALL
  getCache(): {[date: string]: {
    [meal:string]: Meal
  }}
  {
    const cacheCopy = {};

    Object.keys(this.cache).forEach(date=>{
      cacheCopy[date] = this.getMealsByDate(date);
    })

    return cacheCopy;
  }

  // READ ONE
  getMealsByDate(date: string): {[meal:string]: Meal}
  {
    const data = this.cache[date];
    if (data){
      const mealsCopy = {};

      mealsCopy["breakfast"] = new Meal(data["breakfast"].foodProducts.slice(), data["breakfast"].totalEco2InKg, date, "breakfast");
      mealsCopy["lunch"] = new Meal(data["lunch"].foodProducts.slice(), data["lunch"].totalEco2InKg, date, "lunch");
      mealsCopy["dinner"] = new Meal(data["dinner"].foodProducts.slice(), data["dinner"].totalEco2InKg, date, "dinner");

      return mealsCopy;
    }

    return null;
  }

}
