import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {HistoryComponent} from "./history/history.component";
import {RiskyComponent} from "./risky/risky.component";
import {CommonModule} from "@angular/common";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {JoueurVsIaComponent} from "./joueur-vs-ia/joueur-vs-ia.component";
import {IaVsIaComponent} from "./ia-vs-ia/ia-vs-ia.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'game', component: RiskyComponent},
  {path: 'joueur-vs-ia', component: JoueurVsIaComponent},
  {path: 'ia-vs-ia', component: IaVsIaComponent},
  {path: 'history', component: HistoryComponent},




];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // scroll top all the routing components
    })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
