import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Action} from "../_models/actions";

@Component({
  selector: 'app-risky',
  templateUrl: './risky.component.html',
  styleUrls: ['./risky.component.css']
})
export class RiskyComponent implements OnInit {

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
