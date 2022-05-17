import { Injectable } from "@angular/core";
import { Flight } from "../models/flight.model";

@Injectable({
  providedIn: "root"
})
export class FlightService{
  private cache: {[date:string]: Flight[]} = {};

  // READ (ALL)
  getCache()
  {
    let copy: {[date:string]: Flight[]} = {}
    for (let date of Object.keys(this.cache)){
      copy[date] = this.cache[date].slice();
    }

    return copy;
  }

  // READ (MANY)
  searchFlightsByDate(date: string)
  {
    return this.cache[date]? this.cache[date].slice():[];
  }

  // CREATE (MANY)
  addFlights(flights: Flight[], date: string)
  {
    if (!this.cache[date])
    {
      this.cache[date] = [];
    }

    this.cache[date] = this.cache[date].concat(flights.slice());
  }

  // REMOVE MANY
  removeFlightsOnDate(date: string)
  {
    this.cache[date] = [];
  }

}
