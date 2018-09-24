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
}
