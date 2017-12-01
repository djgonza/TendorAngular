import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TokenModule } from '../token/token.module';

import { DocumentosComponent } from './components/documentos/documentos.component';
import { NuevoDocumentoComponent } from './components/nuevoDocumento/nuevoDocumento.component';
import { NuevoCampoComponent } from './components/nuevoCampo/nuevoCampo.component';
import { ListaDocumentosComponent } from './components/listaDocumentos/listaDocumentos.component';
import { ListaCampos } from './components/listaCampos/listaCampos.component'; //REVISAR

import { BarraLateralComponent } from './components/barraLateral/barraLateral.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';

import { DocumentosService } from './services/documentos.service';
import { CamposService } from './services/campos.service';
import { TipoValoresService } from './services/tipoValores.service';
import { MessagesService } from './../../services/messages.service';

@NgModule({
    declarations: [
        DocumentosComponent,
        ListaDocumentosComponent,
        ListaCampos,
        NuevoDocumentoComponent,
        NuevoCampoComponent,
        BarraLateralComponent,
        CabeceraComponent,
        CuerpoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TokenModule
    ],
    providers: [
        MessagesService,
        DocumentosService,
        CamposService,
        TipoValoresService
    ],
    bootstrap: [DocumentosComponent]
})
export class DocumentosModule { }
