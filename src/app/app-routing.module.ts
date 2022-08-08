import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { CommunityComponent } from "./community/community.component";
import { HomeComponent } from "./home/home.component";
import { LearnComponent } from "./learn/learn.component";
import { PracticeComponent } from "./practice/practice.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "practice", component: PracticeComponent, canActivate: [AuthGuard]},
  {path: "learn", component: LearnComponent, canActivate: [AuthGuard]},
  {path: "statistics", component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: "community", component: CommunityComponent, canActivate: [AuthGuard]},
  {path: "auth", component: AuthComponent},

  {path: "record", loadChildren: () => import('./record/record.module').then(m => m.RecordModule)} //lazy loading, split the code in record module into another bundle
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], //preload lazy-loaded bundle
  exports: [RouterModule]
})
export class AppRoutingModule
{

}
