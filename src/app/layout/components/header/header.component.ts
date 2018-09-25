import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    user_fullName:string='';
    currentDomain:string='';
    userDomains: any[];
    domainForm: FormGroup;
  closeResult: string;

    constructor(private translate: TranslateService, public router: Router,private apiService:ApiService,
                private formBuilder: FormBuilder,private modalService: NgbModal,public activeModal: NgbActiveModal) {
        let userInfoObj=JSON.parse(localStorage.getItem('userInfo'));
        let domainSessionObj={
          userId:userInfoObj._id
        };
        if(!localStorage.getItem('currentDomain')){
          this.currentDomain=userInfoObj.domains[0].name;
          localStorage.setItem('currentDomain',JSON.stringify(userInfoObj.domains[0]));
        }else{
          let currentDomainObj=localStorage.getItem('currentDomain');
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

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
