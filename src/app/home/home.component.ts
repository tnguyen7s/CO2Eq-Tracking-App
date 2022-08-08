import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Electricity } from '../shared/models/electricity.model';
import { Flight } from '../shared/models/flight.model';
import { Fuel } from '../shared/models/fuel.model';
import { Meal } from '../shared/models/meal.model';
import { Transport } from '../shared/models/transport.model';
import { ElectricityService } from '../shared/services/electricity.service';
import { FlightService } from '../shared/services/flight.service';
import { FoodService } from '../shared/services/food.service';
import { FuelService } from '../shared/services/fuel.service';
import { TransportService } from '../shared/services/transport.service';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isSettingLimit = true;

  public today: string = "";
  public timeOfDay: string = "";
  public time: number;

  electricityData: Electricity[];
  fuelData: Fuel[];
  flightData: Flight[];
  foodData: Meal[];
  transportData: Transport[];

  constructor(private electricityService: ElectricityService,
              private fuelsService: FuelService,
              private flightService: FlightService,
              private foodService: FoodService,
              private transportService: TransportService,
              private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    // set up datetime
    const date = new Date()
    this.today = date.toString()

    this.time = date.getHours()

    if (this.time>3 && this.time<12) this.timeOfDay = "Morning, "
    else if (this.time>=12 && this.time<=18) this.timeOfDay ="Afternoon, "
    else this.timeOfDay = "Evening, "

    // get the limit from the local storage
    const limit = localStorage.getItem("limit");

    if (limit)
    {
      this.isSettingLimit = false;

      this.statisticsService.monthlyLimit.next(parseInt(limit));
    }
  }

  async onSeeCache(){
    this.electricityData = Object.entries(this.electricityService.getCache()).map((value) => value[1]);
    this.fuelData = Object.entries(this.fuelsService.getCache()).map((value)=> value[1]).flat();
    this.flightData =  Object.entries(this.flightService.getCache()).map((value)=> value[1]).flat();
    const food= await this.foodService.getCache();
    this.foodData = <[]>Object.entries(food).map(value=>value[1]).flat();
    console.log(this.foodData)
    this.transportData = Object.entries(this.transportService.getCache()).map(value=> value[1]);
  }

  // when user click on set the limit
  onSetMyLimit(form: NgForm){
    this.isSettingLimit = false;

    // the value the user set
    const limitValue = form.value['limit'];

    // save the value to the statistics service
    this.statisticsService.monthlyLimit.next(limitValue);

    // save to the local storage
    localStorage.setItem("limit", limitValue);
  }

  // when user click reset the limit
  onResetMyLimit(){
    this.isSettingLimit = true;
  }

}
