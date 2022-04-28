import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {TokenStorageService} from "./_services/token-storage.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'risky-front';
  isCollapsed: boolean = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }



  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService) {
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn=false;
    window.location.reload();
  }

}
