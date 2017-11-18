import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DocumentosModule } from './modules/documentos/documentos.module';

import { AppComponent } from './app.component';

import { LoginService } from './services/login.service';
import { MessagesService } from './services/messages.service'

import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DocumentosModule
  ],
  providers: [ LoginService, MessagesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
