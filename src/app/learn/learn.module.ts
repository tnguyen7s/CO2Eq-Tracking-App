import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { LearnComponent } from "./learn.component";

@NgModule({
  declarations: [LearnComponent],
  imports: [SharedModule],
  exports: [LearnComponent]
})
export class LearnModule{

}
