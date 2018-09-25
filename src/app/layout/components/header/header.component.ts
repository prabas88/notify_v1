import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    user_fullName:string='';
    currentDomain:string='';
    userDomains: any[];
    domainForm: FormGroup;

    constructor(private translate: TranslateService, public router: Router,private apiService:ApiService,
                private formBuilder: FormBuilder) {
        let userInfoObj=JSON.parse(localStorage.getItem('userInfo'));
        let domainSessionObj={
          userId:userInfoObj._id
        };
        if(!localStorage.getItem('currentDomain')){
          this.currentDomain=userInfoObj.domains[0].name;
          console.log("@@@@@@@@"+this.currentDomain);
          localStorage.setItem('currentDomain',JSON.stringify(userInfoObj.domains[0]));
        }else{
          let currentDomainObj=localStorage.getItem('currentDomain');
          console.log("@@@@@@@@"+currentDomainObj);
          let _currentDomainObj=JSON.parse(currentDomainObj);
          this.currentDomain=_currentDomainObj.name;
        }
        this.domainForm = this.formBuilder.group({
          domainListBox: [this.currentDomain]
        });
        this.apiService.getDomainDetails(JSON.stringify(domainSessionObj)).subscribe((domains:  any) => {
          this.userDomains=domains;
        });
        this.user_fullName=userInfoObj.firstName+' '+userInfoObj.lastName;
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.clear();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
