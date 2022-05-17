import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  electricityData: Electricity[];
  fuelData: Fuel[];
  flightData: Flight[];
  foodData: Meal[];
  transportData: Transport[];

  constructor(private electricityService: ElectricityService,
              private fuelsService: FuelService,
              private flightService: FlightService,
              private foodService: FoodService,
              private transportService: TransportService) {
  }

  ngOnInit(): void {
    this.electricityData = Object.entries(this.electricityService.getCache()).map((value) => value[1]);
    this.fuelData = Object.entries(this.fuelsService.getCache()).map((value)=> value[1]).flat();
    this.flightData =  Object.entries(this.flightService.getCache()).map((value)=> value[1]).flat();
    this.foodData = Object.entries(this.foodService.getCache()).map(value=>value[1]).flat().map(o=> Object.values(o)).flat();
    this.transportData = Object.entries(this.transportService.getCache()).map(value=> value[1]);
  }

}
