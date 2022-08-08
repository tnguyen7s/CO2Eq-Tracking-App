import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommunityComponent } from "./community.component";

@NgModule({
  declarations: [CommunityComponent],
  imports: [SharedModule],
  exports: [CommunityComponent]
})
export class CommunityModule{

}
