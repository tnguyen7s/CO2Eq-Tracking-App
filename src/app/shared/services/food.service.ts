import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Meal } from "../models/meal.model";
import { environment } from '../../../environments/environment.prod';
import { AuthService } from "src/app/auth/auth.service";
import { HttpClient } from "@angular/common/http";

const BACKEND_URL = environment.APP_BACK_END_BASE_URL+"/record/meals/";

export interface APIMealModel{
  'id'?: number,
  'date': string,
  'meal': string,
  'food_products': string,
  'kg_co2eq': number,
  'consumer': number
}

@Injectable({
  providedIn: "root"
})

export class FoodService{
  private cache: {
    [date: string]: Meal[]
  } = {};

  constructor(private authService: AuthService, private http: HttpClient)
  {
  }

  // event is triggered when wanting to empty the plate
  public resetPlate = new Subject<boolean>();

  // event is triggered when wanting to set the food plate
  public setPlate = new Subject<boolean>();

  // CREATE MANY
  addMealsToCache(meals: Meal[])
  {
    this.saveMealsToDb(meals).subscribe(
      (resData) => {
        console.log(resData);

        const date = meals[0].date;
        this.cache[date] = [];
        resData.forEach((m)=> this.cache[date].push(new Meal(JSON.parse(m.food_products), m.kg_co2eq, m.date, m.meal, m.id)))
      },
      (error) => {
        console.log(error)
      }
    )
  }

  //READ ALL
  async getCache(): Promise<{ [date: string]: { [meal: string]: Meal; }; }>
  {
    const cacheCopy = {};

    for (let date of Object.keys(this.cache))
    {
      cacheCopy[date] = await this.getMealsByDate(date);
    }

    return cacheCopy;
  }

  // READ MANY
  async getMealsByDate(date: string): Promise<Meal[]>
  {
    if (!this.cache[date] || this.cache[date].length<=0)
    {
      // if not in cache maybe in db
      const responseData = await this.readMealsFromDb(date);

      if (responseData.length>0)
      {
        this.cache[date] = []

        for (let meal of responseData){
          let foodProducts = JSON.parse(meal.food_products)
          let parsedMeal = new Meal(foodProducts, meal.kg_co2eq, meal.date, meal.meal, meal.id);
          this.cache[date].push(parsedMeal);
        }

      }
    }

    return this.cache[date]? this.cache[date].slice():[];
  }

  // DELETE (MANY)
  async removeMealsByDate(date: string)
  {
    await this.deleteMealsFromDb(date);
    this.cache[date]=[];
  }

  /*******************************************DATABASE OPERATIONS********************************************/
  // CREATE
  private saveMealsToDb(meals: Meal[])
  {
    const body = meals.map((m)=> {
      return {
        'id': -1,
        'date': m.date,
        'meal': m.meal,
        'food_products': JSON.stringify(m.foodProducts),
        'kg_co2eq': m.totalEco2InKg,
        'consumer': this.authService.getUserId()
      }
    });

    return this.http.post<APIMealModel[]>(BACKEND_URL+meals[0].date, body, {
      headers:{
        'Authorization': `Token ${this.authService.getToken()}`
      }
    });
  }
  // READ
  private async readMealsFromDb(date: string): Promise<APIMealModel[]>
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

    return <APIMealModel[]>responseData;
  }

  // READ MONTHLY DATA
  public async readMonthlyMealDataFromDb(month: number): Promise<APIMealModel[]>{
    let responseData  = [];

    await fetch(BACKEND_URL+`bulk/${month}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Token ${this.authService.getToken()}`
      }
    })
    .then((response)=>{
      if (!response.ok) throw Error(response.statusText);

      return response.json();
    })
    .then((data)=>{
      responseData = data;

       // cache the data read
       const cacheData = {};
       (<APIMealModel[]>data).forEach(m=>{
         if (!cacheData[m.date]) cacheData[m.date] = []
         cacheData[m.date].push(new Meal(JSON.parse(m.food_products), m.kg_co2eq, m.date, m.meal, m.id));
       });
       Object.keys(cacheData).forEach(date=>{
         if (!this.cache[date]) this.cache[date] = cacheData[date];
       });
    })
    .catch((error)=> {
      console.log(error);
    })

    return responseData;
  }

  // DELETE
  private async deleteMealsFromDb(date: string){
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

