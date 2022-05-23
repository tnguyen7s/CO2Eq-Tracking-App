import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Electricity } from "../models/electricity.model";
import { Fuel } from "../models/fuel.model";
import { Transport } from "../models/transport.model";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})

export class ThirdPartyAPIService{
  private CLOVERLY = environment.CLOVERLY;

  private ACTIVE_API = environment.ACTIVE_API;

  constructor(private http: HttpClient)
  {
  }

  // ELECTRICITY
  getCo2eOfGivenElectricityCloverly(e: Electricity)
  {
      //prepare body
      const body = {
        "energy": {
          "value": e.value,
          "units": e.units
        }
      }

      //send post request
      return this.http.post(this.CLOVERLY.URL.ELECTRICITY, body, {
        headers: new HttpHeaders().set("Authorization", this.CLOVERLY.API_PUBLIC_KEY).set("Content-Type", "application/json")
      });
  }

  // FUELS
  async getCo2eOfGivenFuelCloverly(f: Fuel)
   {
     const body = {
       "fuel": {
         "type": f.type,
         "value": f.value,
         "units": f.units
        }
      }
      console.log(JSON.stringify(body))

      let res = {};

      await fetch(this.CLOVERLY.URL.FUEL, {
        'method': 'POST',
        'headers': {
          "Content-Type": "application/json",
          "Authorization": this.CLOVERLY.API_PUBLIC_KEY,
        },
        'body': JSON.stringify(body),
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        res = data;
      })
      .catch((error)=> {
        console.log(error);
      });

      return res;
   }

   // Other transports
   getCo2eOfGivenTransportCloverly(trip: Transport)
   {
     const body = {
      "distance": {
        "value": trip.distance,
        "units": trip.distUnit
      },
      "fuel_efficiency": {
        "value": trip.fuelEfficiency,
        "units": trip.fuelEfUnit,
        "of": trip.fuelType
      }
     };

     return this.http.post(this.CLOVERLY.URL.TRANSPORT, body, {
       headers: new HttpHeaders().set("Authorization", this.CLOVERLY.API_PUBLIC_KEY).set("Content-Type", "application/json")
     })
   }


   // AIRPORT
   //https://rapidapi.com/Active-api/api/airport-info/
   async getAirportInfo(airportIATA: string)
   {
      let res = {};
      await fetch(this.ACTIVE_API.URL+airportIATA.toUpperCase(), {
        headers: {
          "X-RapidAPI-Host": this.ACTIVE_API.API_HOST,
          "X-RapidAPI-Key":  this.ACTIVE_API.API_KEY
        }
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        res = data;
      })
      .catch((error)=> {
        console.log(error);
      });

      return res;
   }

  }
