import { Injectable } from "@angular/core";
import { Transport } from "../models/transport.model";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { AuthService } from "src/app/auth/auth.service";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL + "/record/transport/";
export interface APITransportModel{
  'id'?: number,
  'date': string,
  'distance': number,
  'distance_unit': string,
  'fuel_efficiency': number,
  'fuel_eff_unit': string,
  'fuel_type': string,
  'kg_co2eq': number,
  'consumer': number
}
@Injectable({
  providedIn: "root"
})
export class TransportService{
  private cache: {[date: string]: Transport} = {};

  constructor(private httpClient: HttpClient, private authService: AuthService){
  }

  // CREATE ONE (override)
  createTransport(trip: Transport)
  {
    // add trip to the cache
    this.cache[trip.date] = trip.clone();

    // save it to the database
    const obs = this.saveTransportToDb(trip).subscribe(
      (resData)=>{
        console.log(resData);
        // get the record id
        this.cache[trip.date].id = resData.id;
      },
      (error) =>{
        console.log(error);
      }
    )
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
  async getTransportByDate(date: string)
  {
    if (!this.cache[date]){
      // transport by date is not in cache, may be in db
      const response = await this.readTransportFromDb(date);

      if (response.id){
        this.cache[date] = new Transport(response.date, response.distance, response.distance_unit, response.fuel_efficiency, response.fuel_eff_unit, response.fuel_type, response.kg_co2eq, response.id)
      }
    }

    if (this.cache[date])
      return this.cache[date].clone();

    return null;
  }

  // REMOVE ONE
  async removeTransportByDate(date: string)
  {
    if (this.cache[date]){
      delete this.cache[date];
    }

    await this.deleteTransportFromDb(date)
  }

   /*******************************************DATABASE OPERATIONS********************************************/
  // CREATE
  private saveTransportToDb(t: Transport)
  {
    const body: APITransportModel = {
      'id': -1,
      'date': t.date,
      'distance': t.distance,
      'distance_unit': t.distUnit,
      'fuel_efficiency': t.fuelEfficiency,
      'fuel_eff_unit': t.fuelEfUnit,
      'fuel_type': t.fuelType,
      'kg_co2eq': t.eCo2InKg,
      'consumer': this.authService.getUserId()
    };

    return this.httpClient.post<APITransportModel>(BACKEND_URL+t.date, body, {
      headers:{
        'Authorization': `Token ${this.authService.getToken()}`
      }
    });
  }
  // READ
  private async readTransportFromDb(date: string): Promise<APITransportModel>
  {
    let responseData:any = {};
    await fetch(BACKEND_URL+date, {
      method: "GET",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      console.log(response);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json()
    })
    .then((data)=>{
      responseData = data;
    })
    .catch((error) => {
      console.log('Error', error);
    })

    return <APITransportModel>responseData; // either return {} or APIElectricityModel
  }
  // DELETE

  private async deleteTransportFromDb(date: string){
    await fetch(BACKEND_URL+date, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      console.log(response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }
}
