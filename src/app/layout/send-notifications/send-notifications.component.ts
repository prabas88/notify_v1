import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../../api.service';
@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.scss'],
  animations: [routerTransition()]
})
export class SendNotificationsComponent implements OnInit {
  notificationCreateForm: FormGroup;
  submitted = false;
  isNotificationCreated=false;
  createDescription:any='';
  constructor(private formBuilder: FormBuilder,private apiService:ApiService) {
    this.notificationCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      iconURL: ['', Validators.required],
      click_action: ['']
    });
  }

  ngOnInit() {
  }
  sendNotification(){
    console.log("sendNotification...!")
    this.submitted = true;

    // stop here if form is invalid
    if (this.notificationCreateForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.notificationCreateForm.value));
    this.apiService.sendNewNotification(JSON.stringify(this.notificationCreateForm.value)).subscribe((data:  any) => {
      this.isNotificationCreated=true;
      this.createDescription=data.description;
    });
  }
  get f() { return this.notificationCreateForm.controls; }

}
