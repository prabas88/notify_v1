import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendNotificationsComponent } from './send-notifications.component';

const routes: Routes = [
  {
    path: '', component: SendNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendNotificationsRoutingModule { }
