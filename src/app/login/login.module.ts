import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
                CommonModule,
                LoginRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                NgbModule
            ],
    declarations: [LoginComponent]
})
export class LoginModule {}
