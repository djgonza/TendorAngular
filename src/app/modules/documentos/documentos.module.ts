import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Modulos
import { TokenModule } from "app/modules/token/token.module";

//Componentes
import { DocumentosComponent } from 'app/modules/documentos/components/documentos/documentos.component';
import { EditarCampoComponent } from 'app/modules/documentos/components/editarCampos/editarCampos.component';
import { ListaDocumentosComponent } from 'app/modules/documentos/components/listaDocumentos/listaDocumentos.component';
import { CabeceraComponent } from 'app/modules/documentos/components/cabecera/cabecera.component';
import { CrearDocumentoComponent } from 'app/modules/documentos/components/crearDocumento/crearDocumento.component';
import { DetallesDocumentoComponent } from 'app/modules/documentos/components/detallesDocumento/detallesDocumento.component';
import { EditarDocumentoComponent } from 'app/modules/documentos/components/editarDocumento/editarDocumento.component';
import { TablaRegistrosComponent } from "app/modules/documentos/components/tablaRegistros/tablaRegistros.component";

//Servicios
import { DocumentosService } from 'app/modules/documentos/services/documentos.service';
import { TipoValoresService } from 'app/modules/documentos/services/tipoValores.service';
import { MessagesService } from 'app/services/messages.service';
import { RegistrosService } from "app/modules/documentos/services/registros.service";

@NgModule({
    declarations: [
        DocumentosComponent,
        ListaDocumentosComponent,
        CrearDocumentoComponent,
        EditarCampoComponent,
        CabeceraComponent,
        DetallesDocumentoComponent,
        EditarDocumentoComponent,
        TablaRegistrosComponent
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
        TipoValoresService,
        RegistrosService
    ],
    bootstrap: [DocumentosComponent]
})
export class DocumentosModule { }
