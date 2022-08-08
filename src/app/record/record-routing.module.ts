import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ElectricityComponent } from "./electricity/electricity.component";
import { FlightComponent } from "./flight/flight.component";
import { FoodComponent } from "./food/food.component";
import { OtherTransportsComponent } from "./other-transports/other-transports.component";
import { ProductsComponent } from "./products/products.component";
import { RecordComponent } from "./record.component";

// give record a seperate routing module for lazy loading
const routes: Routes = [
  {path: "", component: RecordComponent, canActivate: [AuthGuard],
  children: [
    {path: "flight", component: FlightComponent},
    {path: "flight/:date", component: FlightComponent},
    {path: "other-transports", component:  OtherTransportsComponent},
    {path: "other-transports/:date", component:  OtherTransportsComponent},
    {path: "electricity", component: ElectricityComponent},
    {path: "electricity/:date", component: ElectricityComponent},
    {path: "food", component: FoodComponent},
    {path: "food/:date", component: FoodComponent},
    {path: "products", component: ProductsComponent},
    {path: "products/:date", component: ProductsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule
{

}
