import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ApiService } from '../../api.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    activeUserRequest:any={};
    activeSubscribersCount:any;


    constructor(private apiService:ApiService) {
      console.log("loading dashboard!!")
      let userInfoObj=JSON.parse(localStorage.getItem('userInfo'));
      let currentDomain=JSON.parse(localStorage.getItem('currentDomain'));
      this.activeUserRequest.userId=userInfoObj._id;
      this.activeUserRequest.domain=currentDomain.name;
      console.log(`current domain: ${currentDomain.name}`);
      this.getActiveSubscribesCount();
    }

    ngOnInit() {
      console.log("DashboardComponent")
    }

    getActiveSubscribesCount(){
      console.log("getActiveSubscribesCount")
      this.apiService.getActiveSubscribersCount(JSON.stringify(this.activeUserRequest)).subscribe((responseObj:  any) => {
        this.activeSubscribersCount=responseObj.payload.activeUsers;
      });
    }

}
