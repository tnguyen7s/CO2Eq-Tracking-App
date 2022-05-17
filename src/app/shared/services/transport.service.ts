import { Injectable } from "@angular/core";
import { Transport } from "../models/transport.model";

@Injectable({
  providedIn: "root"
})
export class TransportService{
  private cache: {[date: string]: Transport} = {};

  // CREATE ONE (override)
  createTransport(trip: Transport)
  {
    if (trip){
      this.cache[trip.date] = trip.clone();
    }
  }

  // READ ALL
  getCache(): {[date:string]: Transport}
  {
    const copy = {};
    Object.keys(this.cache).forEach(date=>{
      copy[date] = this.cache[date].clone();
    })

    return copy;
  }

  // READ ONE
  getTransportByDate(dateInput: string)
  {
    if (this.cache[dateInput])
      return this.cache[dateInput].clone();

      return null;
  }
}
