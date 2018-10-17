import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../../api.service';
import {parallel}  from 'async';
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
   userInfoObj:any;
  currentDomain:any;
  constructor(private formBuilder: FormBuilder,private apiService:ApiService) {
     this.userInfoObj=JSON.parse(localStorage.getItem('userInfo'));
     this.currentDomain=JSON.parse(localStorage.getItem('currentDomain'));

  }
  isPushNowLater(){
    //console.log(this.notificationCreateForm.value);
    return true;
  }
  ngOnInit() {
    this.notificationCreateForm = this.formBuilder.group({
      compiegne: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      iconURL: ['', Validators.required],
      click_action: [''],
      notificationType:1,
      shceduledate:[''],
      time : [{hour: 13, minute: 30}]

    });
  }
  sendNotification(){
    console.log("sendNotification...!")
    this.submitted = true;

    // stop here if form is invalid
    if (this.notificationCreateForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.notificationCreateForm.value));
    let notificatiobFrom:any=this.notificationCreateForm.value;
    let that=this;
    parallel([
        function(callback) {
          console.log("callback-1");
          let notificationPayload:any={};
          notificationPayload.userId=that.userInfoObj._id;
          notificationPayload.domain=that.currentDomain.name;
          notificationPayload.message=notificatiobFrom;
          console.log(notificationPayload);
          that.apiService.sendNewNotification(JSON.stringify(notificationPayload)).subscribe((data:  any) => {
            that.isNotificationCreated=true;
            that.createDescription=data.description;
            callback(null, data);
          });

        },
        function(callback) {
          console.log("callback-2");
          notificatiobFrom.userId=that.userInfoObj._id;
          notificatiobFrom.domain=that.currentDomain.name;
          that.apiService.addNotification(JSON.stringify(notificatiobFrom)).subscribe((data:  any) => {
            console.log(data)
            callback(null, data);
          });
        }
      ],
      function(err, results) {
        console.log("in:final...");
        console.log(results);
      });

  }
  get f() { return this.notificationCreateForm.controls; }

}
