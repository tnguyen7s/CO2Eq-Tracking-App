import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './shared/navigation-menu/navigation-menu.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';
import { LearnComponent } from './learn/learn.component';
import { StatisticsComponent } from './shared/statistics/statistics.component';
import { CommunityComponent } from './community/community.component';
import { FlightComponent } from './record/flight/flight.component';
import { OtherTransportsComponent } from './record/other-transports/other-transports.component';
import { ElectricityComponent } from './record/electricity/electricity.component';
import { FoodComponent } from './record/food/food.component';
import { ProductsComponent } from './record/products/products.component';
import { RecordComponent } from './record/record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Eco2FoodFactsComponent } from './record/food/eco2-food-facts/eco2-food-facts.component';
import { Eco2FoodChartComponent } from './record/food/eco2-food-chart/eco2-food-chart.component';
import { Eco2FoodTableComponent } from './record/food/eco2-food-table/eco2-food-table.component';
import { PlateFoodPickerComponent } from './record/food/plate-food-picker/plate-food-picker.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { ConvertPipe } from './shared/pipes/convert.pipe';
import { Eco2FlightChartComponent } from './record/flight/eco2-flight-chart/eco2-flight-chart.component';
import { FacebookShareComponent } from './shared/social-sharing-buttons/facebook-share/facebook-share.component';
import { LinkedInShareComponent } from './shared/social-sharing-buttons/linked-in-share/linked-in-share.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { Eco2TrackerBulletchartComponent } from './home/eco2-tracker-bulletchart/eco2-tracker-bulletchart.component';
import { ToggleSwitchComponent } from './shared/toggle-switch/toggle-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    AccountComponent,
    HomeComponent,
    PracticeComponent,
    LearnComponent,
    StatisticsComponent,
    CommunityComponent,
    FlightComponent,
    OtherTransportsComponent,
    ElectricityComponent,
    FoodComponent,
    ProductsComponent,
    RecordComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    Eco2FoodFactsComponent,
    Eco2FoodChartComponent,
    Eco2FoodTableComponent,
    PlateFoodPickerComponent,
    Eco2FlightChartComponent,
    SortPipe,
    ConvertPipe,
    FacebookShareComponent,
    LinkedInShareComponent,
    Eco2TrackerBulletchartComponent,
    ToggleSwitchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
