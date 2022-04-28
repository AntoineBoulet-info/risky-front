import {Component, Injectable, OnInit} from '@angular/core';
import {IaService} from "../_services/ia.service";
import {Ia} from "../_models/ia";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ia-vs-ia',
  templateUrl: './ia-vs-ia.component.html',
  styleUrls: ['./ia-vs-ia.component.css'],
  providers: [IaService]
})

export class IaVsIaComponent implements OnInit {

  allIa: any;
  ia1$: Observable<Ia[]> | undefined;
  ia2$: Observable<Ia[]> | undefined
  ia: Ia | undefined ;

  constructor(private iaService: IaService
  ) {
  }

  ngOnInit(): void {
    this.ia1$ = this.iaService.getIA1();
    // get ia
    this.iaService.getIA1().subscribe(ia => {
      this.allIa = ia;
      console.log("ia1 : ",this.allIa);
    });
    this.ia2$ = this.iaService.getIA2();
    this.iaService.getIA2().subscribe(ia => {
      this.allIa = ia;
      console.log("ia2 : ",this.allIa);
    });

  }



}
