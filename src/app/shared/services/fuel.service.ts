import { Injectable } from "@angular/core";
import { Fuel } from "../models/fuel.model";

@Injectable({
  providedIn: "root"
})
export class FuelService{
  private cache: {[date: string]: Fuel[]} = {};

  // READ (ALL)
  getCache(): {[date:string]: Fuel[]}
  {
    // return deep copy
    let copy = {};

    for (let key of Object.keys(this.cache)){
      copy[key] = this.cache[key].slice();
    }

    return copy;
  }

  // READ (ONE)
  searchFuelByDate(date: string)
  {
    return this.cache[date]? this.cache[date].slice():[];
  }

  // CREATE (ONE)
  addFuel(f: Fuel)
  {
    if (!this.cache[f.date]) this.cache[f.date] = [];
    this.cache[f.date].push(f);
  }

  // DELETE (ONE)
  removeFuelByDate(date: string)
  {
    if (this.cache[date]) this.cache[date]=[];
  }
}
