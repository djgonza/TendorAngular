import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */

/* Services */
import { RegistroService } from "app/modules/registro/services/registro.service";

/* Components */
import { RegistroComponent } from "app/modules/registro/components/registro/registro.component";

@NgModule({
    declarations: [
        RegistroComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ 
        RegistroService
     ],
    bootstrap: [
        RegistroComponent
    ]
})
export class RegistroModule { }
