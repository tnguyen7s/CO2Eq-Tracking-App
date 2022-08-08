import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PracticeComponent } from "./practice.component";

@NgModule({
  declarations: [PracticeComponent],
  imports: [SharedModule],
  exports: [PracticeComponent]
})
export class PracticeModule{

}
