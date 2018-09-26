import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationInstructionsComponent } from './integration-instructions.component';
import {IntegrationInstructionsRoutingModule} from './integrations-instructions-routing.module'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IntegrationInstructionsRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [IntegrationInstructionsComponent]
})
export class IntegrationInstructionsModule { }
