import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { CommunityComponent } from "./community/community.component";
import { HomeComponent } from "./home/home.component";
import { LearnComponent } from "./learn/learn.component";
import { PracticeComponent } from "./practice/practice.component";
import { ElectricityComponent } from "./record/electricity/electricity.component";
import { FlightComponent } from "./record/flight/flight.component";
import { FoodComponent } from "./record/food/food.component";
import { OtherTransportsComponent } from "./record/other-transports/other-transports.component";
import { ProductsComponent } from "./record/products/products.component";
import { RecordComponent } from "./record/record.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "record", component: RecordComponent, canActivate: [AuthGuard],
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
  ]},
  {path: "practice", component: PracticeComponent, canActivate: [AuthGuard]},
  {path: "learn", component: LearnComponent, canActivate: [AuthGuard]},
  {path: "statistics", component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: "community", component: CommunityComponent, canActivate: [AuthGuard]},
  {path: "auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{

}
