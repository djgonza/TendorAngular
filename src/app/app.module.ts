import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppRoutingModule } from "app/app-routing.module";
import { RegistroModule } from "app/modules/registro/registro.module";
import { LoginModule } from "app/modules/login/login.module";
import { DocumentosModule } from "app/modules/documentos/documentos.module";

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";
import { ErroresService } from "app/services/errores.service";
import { MessagesService } from "app/services/messages.service";

/* Components */
import { AppComponent } from "app/app.component";
import { ErroresComponent } from "app/components/errores/errores.component";
import { MessagesComponent } from "app/components/messages/messages.component";

@NgModule({
  declarations: [
    AppComponent,
    ErroresComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DocumentosModule,
    LoginModule,
    RegistroModule
  ],
  providers: [  
    HttpService,
    AppMemoriaService,
    ErroresService,
    MessagesService
  ],
  bootstrap: [ 
    AppComponent
  ]
})
export class AppModule { }
