import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-integration-instructions',
  templateUrl: './integration-instructions.component.html',
  styleUrls: ['./integration-instructions.component.scss'],
  animations: [routerTransition()]
})
export class IntegrationInstructionsComponent implements OnInit {
  scriptfile:any="https://cdn.izooto.com/scripts/6e2a15d3337aa67106f8d8d9dcb136b10154d41c.js";
  constructor() {
    console.log("calling con...")
  }

  ngOnInit() {
    console.log("calling oninit...")
  }

}
