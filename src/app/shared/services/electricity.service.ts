import { Injectable } from "@angular/core";
import { Electricity } from "../models/electricity.model";

@Injectable({
  providedIn: "root"
})
export class ElectricityService{
  private cache: {[date:string]: Electricity} = {};

  // READ (ALL)
  getCache()
  {
    return {...this.cache};
  }

  // READ (ONE)
  searchElectricityByDate(date: string)
  {
    return this.cache[date];
  }

  // CREATE (ONE)
  addElectricity(e: Electricity)
  {
    this.cache[e.date] = e;
  }

  // DELETE (ONE)
  removeElectricityByDate(date: string)
  {
    if (this.cache[date]) delete this.cache[date];
  }
}
