import { NgModule } from "@angular/core";
import { FlightComponent } from './flight/flight.component';
import { OtherTransportsComponent } from './other-transports/other-transports.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { FoodComponent } from './food/food.component';
import { ProductsComponent } from './products/products.component';
import { RecordComponent } from './record.component';
import { Eco2FoodFactsComponent } from './food/eco2-food-facts/eco2-food-facts.component';
import { Eco2FoodChartComponent } from './food/eco2-food-chart/eco2-food-chart.component';
import { Eco2FoodTableComponent } from './food/eco2-food-table/eco2-food-table.component';
import { PlateFoodPickerComponent } from './food/plate-food-picker/plate-food-picker.component';
import { Eco2FlightChartComponent } from "./flight/eco2-flight-chart/eco2-flight-chart.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from "../shared/shared.module";
import { RecordRoutingModule } from "./record-routing.module";

@NgModule({
  declarations: [
    RecordComponent,
    FlightComponent,
    OtherTransportsComponent,
    ElectricityComponent,
    FoodComponent,
    ProductsComponent,
    Eco2FoodFactsComponent,
    Eco2FoodChartComponent,
    Eco2FoodTableComponent,
    PlateFoodPickerComponent,
    Eco2FlightChartComponent,
  ],
  imports: [
    DragDropModule,
    SharedModule,
    RecordRoutingModule
  ],
  exports: [
    FlightComponent,
    OtherTransportsComponent,
    ElectricityComponent,
    FoodComponent,
    ProductsComponent,
    RecordComponent,
    Eco2FoodFactsComponent,
    Eco2FoodChartComponent,
    Eco2FoodTableComponent,
    PlateFoodPickerComponent,
    Eco2FlightChartComponent,
  ]
})
export class RecordModule{

}
