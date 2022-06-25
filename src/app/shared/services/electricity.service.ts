import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Electricity } from "../models/electricity.model";
import { environment } from "src/environments/environment.prod";
import { AuthService } from "src/app/auth/auth.service";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL + "/record/electricity/";

export interface APIElectricityModel{
  'id'?: number,
  'date': string,
  'value': number,
  'units': string,
  'kg_co2eq': number,
  'consumer': number
}

@Injectable({
  providedIn: "root"
})
export class ElectricityService{
  private cache: {[date:string]: Electricity} = {};

  constructor(private httpClient: HttpClient, private authService: AuthService){
  }

  // READ (ALL)
  getCache()
  {
    return {...this.cache};
  }

  // READ (ONE)
  async searchElectricityByDate(date: string)
  {
    if (!date) return null;
    if (!this.cache[date]){
      // eletricity by date is not in cache, may be in db
      const response = await this.readElectricityFromDb(date);

      if (response.id){
        this.cache[date] = new Electricity(response.value, response.units, response.date, response.kg_co2eq, response.id)
      }
    }

    console.log("result: ", this.cache[date])
    return this.cache[date]? this.cache[date].clone(): null;
  }

  // CREATE (ONE)
  addElectricity(e: Electricity)
  {
    // add e to the cache
    this.cache[e.date] = e.clone();

    // save it to the database
    const obs = this.saveElectricityToDb(e).subscribe(
      (resData)=>{
        console.log(resData);
        // get the record id
        this.cache[e.date].id = resData.id;
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  // DELETE (ONE)
  async removeElectricityByDate(date: string)
  {
    if (this.cache[date]){
      delete this.cache[date];
    }

    await this.deleteElectricityFromDb(date)
  }


  /*******************************************DATABASE OPERATIONS********************************************/
  // CREATE
  private saveElectricityToDb(e: Electricity)
  {
    const body: APIElectricityModel = {
      'id': -1,
      'date': e.date,
      'value': e.value,
      'units': e.units,
      'kg_co2eq': e.co2eInKg,
      'consumer': this.authService.getUserId()
    };

    return this.httpClient.post<APIElectricityModel>(BACKEND_URL+e.date, body, {
      headers:{
        'Authorization': `Token ${this.authService.getToken()}`
      }
    });
  }
  // READ
  private async readElectricityFromDb(date: string): Promise<APIElectricityModel>
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

    return <APIElectricityModel>responseData; // either return {} or APIElectricityModel
  }

  // READ MONTHLY DATA
  public async readMonthlyElectricityDataFromDb(month: number): Promise<APIElectricityModel[]>{
    let responseData = [];

    await fetch(BACKEND_URL+`bulk/${month}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`,
      }
    })
    .then((response)=>{
      console.log(response);

      if (!response.ok){
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then((data)=>{
      responseData = data;

      // save data fetched from the database to cache
      (<APIElectricityModel[]>data).forEach(e=>{
        this.cache[e.date] = new Electricity(e.value, e.units, e.date, e.kg_co2eq, e.id)
      })
    })
    .catch((error)=>{
      console.log('Error', error);
    })

    return <APIElectricityModel[]>responseData;
  }


  // DELETE
  private async deleteElectricityFromDb(date: string){
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
