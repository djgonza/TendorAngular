import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */

/* Services */
import { LoginService } from "app/modules/login/services/login.service";

/* Components */
import { LoginComponent } from "app/modules/login/components/login/login.component";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        LoginService
    ],
    bootstrap: [
        LoginComponent
    ]
})
export class LoginModule { }
