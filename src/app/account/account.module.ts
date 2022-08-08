import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account.component";

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [AccountComponent]
})
export class AccountModule{

}
