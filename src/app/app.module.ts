import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DocumentosModule } from './modules/documentos/documentos.module';
import { TokenModule } from './modules/token/token.module';

import { AppComponent } from './app.component';

import { MessagesService } from './services/messages.service'

import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DocumentosModule,
    TokenModule
  ],
  providers: [ MessagesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
