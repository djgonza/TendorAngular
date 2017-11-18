import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DocumentosComponent } from './components/documentos/documentos.component';

import { MessagesService } from './../../services/messages.service'

@NgModule({
    declarations: [
        DocumentosComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ MessagesService ],
    bootstrap: [ DocumentosComponent ]
})
export class DocumentosModule { }
