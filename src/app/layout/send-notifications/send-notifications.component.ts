import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.scss'],
  animations: [routerTransition()]
})
export class SendNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
