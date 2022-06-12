import { Injectable } from "@angular/core";
import { Flight } from "../models/flight.model";
import { environment } from '../../../environments/environment.prod';
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL + "/record/flights/";

export interface APIFlightModel{
  'id'?: number,
  'date': string,
  'source_iata': string,
  'destination_iata': string,
  'cabin_class': string,
  'source_name': string,
  'destination_name': string,
  'kg_co2eq': number,
  'consumer': number
}

@Injectable({
  providedIn: "root"
})
export class FlightService{
  private cache: {[date:string]: Flight[]} = {};

  constructor(private authService: AuthService, private http: HttpClient)
  {
  }

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
  async searchFlightsByDate(date: string)
  {
    if (!this.cache[date])
    {
      // if not in cache, search in the database
      const responseData = await this.readFlightsFromDb(date);
      if (responseData)
      {
        this.cache[date] = [];
        responseData.forEach((f) => {
          this.cache[date].push(new Flight(f.date, f.source_iata, f.destination_iata, f.cabin_class, f.kg_co2eq, f.source_name, f.destination_name, f.id));
        })
      }
    }

    return this.cache[date]? this.cache[date].slice():[];
  }

  // CREATE (MANY)
  addFlightsByDate(flights: Flight[], date: string)
  {
    this.saveFlightsToDb(flights).subscribe(
      (resData)=>{
        this.cache[date] = [];
        resData.forEach((f)=>{
          this.cache[date].push(new Flight(f.date, f.source_iata, f.destination_iata, f.cabin_class, f.kg_co2eq, f.source_name, f.destination_name, f.id));
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // REMOVE MANY
  async removeFlightsOnDate(date: string)
  {
    await this.deleteFlightsFromDb(date);
    this.cache[date] = [];
  }

  /*******************************************DATABASE OPERATIONS********************************************/
  // CREATE
  private saveFlightsToDb(flights: Flight[])
  {
    const body = flights.map((f)=> {
      return {
        'id': -1,
        'date': f.date,
        'source_iata': f.sourceIATA,
        'destination_iata': f.destinationIATA,
        'cabin_class': f.cabinClass,
        'source_name': f.sourceName,
        'destination_name': f.destinationName,
        'kg_co2eq': f.co2eInKg,
        'consumer': this.authService.getUserId()
      }
    });

    return this.http.post<APIFlightModel[]>(BACKEND_URL+flights[0].date, body, {
      headers:{
        'Authorization': `Token ${this.authService.getToken()}`
      }
    });
  }
  // READ
  private async readFlightsFromDb(date: string): Promise<APIFlightModel[]>
  {
    let responseData: any=[];

    await fetch(BACKEND_URL+date, {
      method: "GET",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }

      console.log(response);
      return response.json();
    })
    .then((data)=>{
      responseData = data;
    })
    .catch((error) => {
      console.log(error);
    });

    return <APIFlightModel[]>responseData;
  }

  // DELETE
  private async deleteFlightsFromDb(date: string){
    await fetch(BACKEND_URL+date, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }

      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
}
