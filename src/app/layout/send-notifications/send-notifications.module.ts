import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotificationsRoutingModule } from './send-notifications-routing.module';
import { SendNotificationsComponent } from './send-notifications.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SendNotificationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [SendNotificationsComponent],
  providers: [NgbActiveModal]
})
export class SendNotificationsModule { }
