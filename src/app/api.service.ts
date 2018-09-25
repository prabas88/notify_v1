import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from  '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'https://notification-216420.appspot.com';
  constructor(private  httpClient:  HttpClient) {}

  register(registrationForm:any){
    console.log("in: register");
    return  this.httpClient.post<any>(`${this.API_URL}/api/notification/registration`,registrationForm,httpOptions);
  }

  login(loginForm:any){
    console.log(`in: Login: payload: ${loginForm}`);
    return  this.httpClient.post<any>(`${this.API_URL}/api/notification/signin`,loginForm,httpOptions);
  }

  getDomainDetails(requestObj:any){
    console.log(`in: getDomainDetails: sessionObj: ${requestObj}`);
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'x-access-token':requestObj
      })
    };
    console.log(_httpOptions)
    return  this.httpClient.post<any>(`${this.API_URL}/api/notification/getDomains`,null,_httpOptions);
  }

}
