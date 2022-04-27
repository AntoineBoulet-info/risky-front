import { Component, OnInit } from '@angular/core';
import {Action} from "../_models/actions";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-joueur-vs-ia',
  templateUrl: './joueur-vs-ia.component.html',
  styleUrls: ['./joueur-vs-ia.component.css']
})
export class JoueurVsIaComponent implements OnInit {

  actions: Action[];

  constructor() {
    this.actions = [
      {id: 1, name: 'move'},
      {id: 2, name: 'grow'},
      {id: 3, name: 'sleep'},
    ];
  }

  ngOnInit(): void {
  }


  formulaire = new FormGroup({
    actions: new FormControl(1),
    currentPlace: new FormControl(undefined),
    nextPlace: new FormControl(undefined),
    nbUnits: new FormControl(undefined)

  });

  onSubmit() {
    //todo
  }

}
