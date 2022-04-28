import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RiskyComponent } from './risky/risky.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "./_services/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './sign-up/sign-up.component';
import {ConfirmPasswordDirective} from "./_helpers/confirm-password.directive";
import { PlayGameComponent } from './play-game/play-game.component';
import {DropdownModule} from "primeng/dropdown";
import { IaVsIaComponent } from './ia-vs-ia/ia-vs-ia.component';
import { JoueurVsIaComponent } from './joueur-vs-ia/joueur-vs-ia.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RiskyComponent,
    HomeComponent,
    HistoryComponent,
    SignUpComponent,
    ConfirmPasswordDirective,
    PlayGameComponent,
    IaVsIaComponent,
    JoueurVsIaComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        DropdownModule


    ],
  providers: [MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
