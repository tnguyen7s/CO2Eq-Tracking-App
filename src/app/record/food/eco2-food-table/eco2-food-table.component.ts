import { Component, OnInit } from '@angular/core';
import { Foods } from 'src/app/shared/models/foods.model';


@Component({
  selector: 'app-eco2-food-table',
  templateUrl: './eco2-food-table.component.html',
  styleUrls: ['./eco2-food-table.component.css']
})
export class Eco2FoodTableComponent implements OnInit {
  public ECO2_FOOD_TABLE: {};
  constructor() { }

  ngOnInit(): void {
    this.ECO2_FOOD_TABLE =Foods.KG_ECO2_PER_100G_DATA;
  }

  get39FoodItems(){
    return Object.keys(this.ECO2_FOOD_TABLE);
  }

}
