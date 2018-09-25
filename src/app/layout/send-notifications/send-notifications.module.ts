import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendNotificationsRoutingModule } from './send-notifications-routing.module';
import { SendNotificationsComponent } from './send-notifications.component';

@NgModule({
  imports: [
    CommonModule,
    SendNotificationsRoutingModule
  ],
  declarations: [SendNotificationsComponent]
})
export class SendNotificationsModule { }
