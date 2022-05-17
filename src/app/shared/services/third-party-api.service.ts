import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Electricity } from "../models/electricity.model";
import { Fuel } from "../models/fuel.model";
import { Transport } from "../models/transport.model";


@Injectable({
  providedIn: "root"
})

export class ThirdPartyAPIService{
  private CLOVERLY = {
    API_PUBLIC_KEY: "Bearer public_key:74a2372d12b94cd2f05a",
    URL: {
      ELECTRICITY: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/electricity",
      FUEL: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/fuel",
      TRANSPORT: "https://api-prod-no-cert.cloverly.com/2021-10/estimates/vehicle"
    }
  }

  private ACTIVE_API = {
    API_HOST: "airport-info.p.rapidapi.com",
    API_KEY: "9a325031d8msha55fada455b8d0cp16bd8ajsn7dc0333a39d5",
    URL: "https://airport-info.p.rapidapi.com/airport?iata="
  }

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
  getCo2eOfGivenFuelCloverly(f: Fuel)
   {
      const body = {
        "fuel": {
          "type": f.type,
          "value": f.value,
          "units": f.units
        }
      }

      return this.http.post(this.CLOVERLY.URL.FUEL, body, {
        headers: new HttpHeaders().set("Authorization", this.CLOVERLY.API_PUBLIC_KEY).set("Content-Type", "application/json")
      })
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
