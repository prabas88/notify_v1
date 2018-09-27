import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotificationsRoutingModule } from './send-notifications-routing.module';
import { SendNotificationsComponent } from './send-notifications.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SendNotificationsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SendNotificationsComponent]
})
export class SendNotificationsModule { }
