import { Injectable } from "@angular/core";
import { Fuel } from "../models/fuel.model";
import { environment } from '../../../environments/environment.prod';
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL + "/record/fuels/";

export interface APIFuelModel{
  'id'?: number,
  'date': string,
  'type': string,
  'value': number,
  'units': string,
  'kg_co2eq': number,
  'consumer': number
}

@Injectable({
  providedIn: "root"
})
export class FuelService{
  private cache: {[date: string]: Fuel[]} = {};

  constructor(private authService: AuthService, private http: HttpClient)
  {
  }

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

  // READ (many)
  async searchFuelsByDate(date: string)
  {
    if (!date) return [];
    if (!this.cache[date])
    {
      // if not in cache maybe in db
      const responseData = await this.readFuelsFromDb(date);
      if (responseData.length>0)
      {
        this.cache[date] = []
        responseData.forEach((fuel) => {
          this.cache[date].push(new Fuel(fuel.type, fuel.value, fuel.units, fuel.date, fuel.kg_co2eq, fuel.id))
        })
      }
    }

    return this.cache[date]? this.cache[date].slice():[];
  }

  // CREATE (MANY)
  createFuelsByDate(fuels: Fuel[])
  {
    if (fuels.length==0) return;
    
    this.saveFuelsToDb(fuels).subscribe(
      (resData) => {
        console.log(resData);

        const date = fuels[0].date;
        this.cache[date] = [];
        resData.forEach((f)=> this.cache[date].push(new Fuel(f.type, f.value, f.units, f.date, f.kg_co2eq, f.id)))
      },
      (error) => {
        console.log(error)
      }
    )

  }

  // DELETE (ONE)
  async removeFuelsByDate(date: string)
  {
    await this.deleteFuelsFromDb(date);
    this.cache[date]=[];
  }

  /*******************************************DATABASE OPERATIONS********************************************/
  // CREATE
  private saveFuelsToDb(fuels: Fuel[])
  {
    const body = fuels.map((f)=> {
      return {
        'id': -1,
        'date': f.date,
        'type': f.type,
        'value': f.value,
        'units': f.units,
        'kg_co2eq': f.co2eInKg,
        'consumer': this.authService.getUserId()
      }
    });

    return this.http.post<APIFuelModel[]>(BACKEND_URL+fuels[0].date, body, {
      headers:{
        'Authorization': `Token ${this.authService.getToken()}`
      }
    });
  }
  // READ
  private async readFuelsFromDb(date: string): Promise<APIFuelModel[]>
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

    return <APIFuelModel[]>responseData;
  }

  // READ MONTHLY DATA
  public async readMonthlyFuelDataFromDb(month: number): Promise<APIFuelModel[]>
  {
    let responseData = [];

    await fetch(BACKEND_URL+`bulk/${month}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      if (!response.ok) throw Error(response.statusText);
      return response.json()
    })
    .then((data)=>{
      responseData = data;

       // cache the data read
       const cacheData = {};
       (<APIFuelModel[]>data).forEach(f=>{
         if (!cacheData[f.date]) cacheData[f.date] = []
         cacheData[f.date].push(new Fuel(f.type, f.value, f.units, f.date, f.kg_co2eq, f.id));
       });
       Object.keys(cacheData).forEach(date=>{
         if (!this.cache[date]) this.cache[date] = cacheData[date];
       });
    })
    .catch((error)=>{
      console.log(error);
    })

    return <APIFuelModel[]>responseData;
  }

  // DELETE
  private async deleteFuelsFromDb(date: string){
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


