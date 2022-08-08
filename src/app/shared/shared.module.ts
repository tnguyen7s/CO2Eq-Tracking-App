import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ConvertPipe } from "./pipes/convert.pipe";
import { SortPipe } from "./pipes/sort.pipe";
import { FacebookShareComponent } from "./social-sharing-buttons/facebook-share/facebook-share.component";
import { LinkedInShareComponent } from "./social-sharing-buttons/linked-in-share/linked-in-share.component";
import { ToggleSwitchComponent } from "./toggle-switch/toggle-switch.component";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToggleSwitchComponent,

    SortPipe,
    ConvertPipe,

    FacebookShareComponent,
    LinkedInShareComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    ShareIconsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
  ],
  exports:[
    LoadingSpinnerComponent,
    ToggleSwitchComponent,

    SortPipe,
    ConvertPipe,

    FacebookShareComponent,
    LinkedInShareComponent,

    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule{

}
