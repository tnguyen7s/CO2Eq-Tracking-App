import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ElectricityService } from "../services/electricity.service";
import { FlightService } from "../services/flight.service";
import { FoodService } from "../services/food.service";
import { FuelService } from "../services/fuel.service";
import { TransportService } from "../services/transport.service";

@Injectable({
  providedIn: "root"
})
export class StatisticsService{
  public monthlyLimit:BehaviorSubject<number> = new BehaviorSubject(null);

  private totalEco2ByMonthCache :
  {
    [month:number]:{
      [category:string]: number
    }
  } = {};

  constructor(private electricityService: ElectricityService,
              private flightService: FlightService,
              private foodService: FoodService,
              private fuelService: FuelService,
              private transportService: TransportService)
              {
              }

  /*Get total co2 equivalent this month */
  public async getTotalEco2ThisMonth(){
    const thisMonth = new Date().getMonth()+1; //start from 0 - January

    return await this.getTotalEco2ByMonth(thisMonth);
  }

  /*Get total co2 equivalent with the given month */
  public async getTotalEco2ByMonth(month: number){
    if (!this.totalEco2ByMonthCache[month]){
     await this.updateMonthlyCacheData(month)
    }

    let totalEco2ByMonth = 0;
    Object.keys(this.totalEco2ByMonthCache[month]).forEach(cat =>{
      totalEco2ByMonth += this.totalEco2ByMonthCache[month][cat];
    })

    return totalEco2ByMonth;
  }

  /*Get the monthly data from other services and update totalEco2ByMonthCache */
  private async updateMonthlyCacheData(month: number){
    let totalElectricity = 0;
    let totalFlight = 0;
    let totalFood = 0;
    let totalFuel = 0;
    let totalTransport = 0;

    (await this.electricityService.readMonthlyElectricityDataFromDb(month)).forEach((e)=>{
      totalElectricity += e.kg_co2eq;
    });

    (await this.flightService.readMonthlyFlightDataFromDb(month)).forEach((f)=>{
      totalFlight += f.kg_co2eq;
    });

    (await this.foodService.readMonthlyMealDataFromDb(month)).forEach((m)=>{
      totalFood += m.kg_co2eq;
    });

    (await this.fuelService.readMonthlyFuelDataFromDb(month)).forEach((f)=>{
      totalFuel += f.kg_co2eq;
     });

     (await this.transportService.readMonthlyTransportDataFromDb(month)).forEach((t)=>{
      totalTransport += t.kg_co2eq;
     });

     this.totalEco2ByMonthCache[month] = {};
     this.totalEco2ByMonthCache[month]["electricity"] = totalElectricity;
     this.totalEco2ByMonthCache[month]["flight"] = totalFlight;
     this.totalEco2ByMonthCache[month]["food"] = totalFood;
     this.totalEco2ByMonthCache[month]["fuel"] = totalFuel;
     this.totalEco2ByMonthCache[month]["transport"] = totalTransport;
  }


}
