import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TokenModule } from '../token/token.module';

import { DocumentosComponent } from './components/documentos/documentos.component';
import { NuevoDocumentoComponent } from './components/nuevoDocumento/nuevoDocumento.component';
import { ListaDocumentosComponent } from './components/listaDocumentos/listaDocumentos.component';
import { ListaCampos } from './components/listaCampos/listaCampos.component';

import { DocumentosService } from './services/documentos.service';
import { MessagesService } from './../../services/messages.service';

@NgModule({
    declarations: [
        DocumentosComponent,
        ListaDocumentosComponent,
        ListaCampos,
        NuevoDocumentoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TokenModule
    ],
    providers: [MessagesService, DocumentosService ],
    bootstrap: [ DocumentosComponent ]
})
export class DocumentosModule { }
