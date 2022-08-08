import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { Eco2TrackerBulletchartComponent } from "./eco2-tracker-bulletchart/eco2-tracker-bulletchart.component";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent,
    Eco2TrackerBulletchartComponent,
  ],
  imports:[
    SharedModule
  ],
  exports:[
    HomeComponent,
    Eco2TrackerBulletchartComponent,
  ]
})
export class HomeModule{

}
