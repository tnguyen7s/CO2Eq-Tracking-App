import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { StatisticsComponent } from "./statistics.component";

@NgModule({
  declarations: [StatisticsComponent],
  imports: [SharedModule],
  exports: [StatisticsComponent]
})
export class StatisticsModule{

}
