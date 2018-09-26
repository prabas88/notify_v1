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
    currentDomain:any;
    userDomains: any[];
    addNewDomainForm: FormGroup;
    closeResult: string;
    newDomainsubmitted = false;
    domainSessionObj:any={};
    userInfoObj:any;
    isNewDomainAdded=false;

    loadDomainsListData(_domainList,currentDomain){
      console.log("In:loadDomainsListData");
      console.log(_domainList);
      console.log(currentDomain);
      this.userDomains=_domainList;
      let _currentDomainObj:any;
      if(!localStorage.getItem('currentDomain')){
        console.log("if");
         _currentDomainObj=_domainList[0];
        this.currentDomain=_currentDomainObj;
        localStorage.setItem('currentDomain',JSON.stringify(this.currentDomain));
      }else{
        console.log("else");
        console.log(localStorage.getItem('currentDomain'));
        let __currentDomainObj=JSON.parse(localStorage.getItem('currentDomain'));
        for(var i=0;i<_domainList.length;i++){
          let domainObj=_domainList[i];
          if(domainObj.name==__currentDomainObj.name){
            _currentDomainObj=domainObj;
            break;
          }
        }
      }
      this.currentDomain=_currentDomainObj;
    }

    constructor(private translate: TranslateService, public router: Router,private apiService:ApiService,
                private formBuilder: FormBuilder,private modalService: NgbModal) {
        this.userInfoObj=JSON.parse(localStorage.getItem('userInfo'));

        this.domainSessionObj={
          userId:this.userInfoObj._id
        };
      if(!localStorage.getItem('currentDomain')) {
        this.loadDomainsListData(this.userInfoObj.domains, this.userInfoObj.domains[0]);
      }else{
        this.loadDomainsList()
      }

      this.addNewDomainForm = this.formBuilder.group({
        type: ["0"],
        domainName: ["",[Validators.required]]
      });

        this.user_fullName=this.userInfoObj.firstName+' '+this.userInfoObj.lastName;
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
  loadDomainsList(){
      this.apiService.getDomainDetails(JSON.stringify(this.domainSessionObj)).subscribe((domains:  any) => {
        this.loadDomainsListData(domains,domains[0]);
      });
    }
    ngOnInit() {

    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.clear();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

  openDomainCreateForm(content) {
    this.addNewDomainForm.reset({ type: '0' ,domainName:''});
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
  submitNewDomainForm(){
    console.log("In:submitNewDomainForm");
    this.newDomainsubmitted = true;
    if (this.addNewDomainForm.invalid) {
      return;
    }
    let addDomainRequest={};
    addDomainRequest['userId']=this.userInfoObj._id;
    addDomainRequest['payload']=this.addNewDomainForm.value;
    this.apiService.addNewDomain(JSON.stringify(addDomainRequest)).subscribe((domains:  any) => {
      this.loadDomainsList();
      this.isNewDomainAdded=true;
    });
  }
  get new_domain_form() { return this.addNewDomainForm.controls; }

  onChangeDomain(selectDomainObj){
    console.log("In:onChangeDomain");
    localStorage.setItem('currentDomain',JSON.stringify(selectDomainObj));
    this.router.navigate(["dashboard"]);
    window.location.reload();
  }
}
