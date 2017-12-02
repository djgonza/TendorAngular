import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Modulos
import { TokenModule } from '../token/token.module';

//Componentes
import { DocumentosComponent } from './components/documentos/documentos.component';
import { EditarCampoComponent } from './components/editarCampos/editarCampos.component';
import { ListaDocumentosComponent } from './components/listaDocumentos/listaDocumentos.component';
import { ListaCampos } from './components/listaCampos/listaCampos.component'; //REVISAR
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CrearDocumentoComponent } from './components/crearDocumento/crearDocumento.component';
import { DetallesDocumentoComponent } from './components/detallesDocumento/detallesDocumento.component';
import { EditarDocumentoComponent } from './components/editarDocumento/editarDocumento.component';

//Servicios
import { DocumentosService } from './services/documentos.service';
import { CamposService } from './services/campos.service';
import { TipoValoresService } from './services/tipoValores.service';
import { MessagesService } from './../../services/messages.service';

@NgModule({
    declarations: [
        DocumentosComponent,
        ListaDocumentosComponent,
        CrearDocumentoComponent,
        ListaCampos,
        EditarCampoComponent,
        CabeceraComponent,
        DetallesDocumentoComponent,
        EditarDocumentoComponent
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
