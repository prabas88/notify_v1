import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-integration-instructions',
  templateUrl: './integration-instructions.component.html',
  styleUrls: ['./integration-instructions.component.scss'],
  animations: [routerTransition()]
})
export class IntegrationInstructionsComponent implements OnInit {
  scriptfile:any="";
  constructor() {
    console.log("calling IntegrationInstructionsComponent...");
    let currentDomain=JSON.parse(localStorage.getItem('currentDomain'));
    this.scriptfile=currentDomain.jsFile;

  }

  ngOnInit() {
    console.log("calling oninit...")
  }

}
