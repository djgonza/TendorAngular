import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */

/* Services */
import { AppMemoriaService } from "app/services/appMemoria.service";
import { ErroresService } from "app/services/errores.service";
import { MessagesService } from "app/services/messages.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { TipoValoresService } from "app/modules/documentos/services/tipoValores.service";
import { CamposService } from "app/modules/documentos/services/campos.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

/* Components */
import { DocumentosComponent } from "app/modules/documentos/components/documentos/documentos.component";
import { CabeceraComponent } from "app/modules/documentos/components/cabecera/cabecera.component";
import { ListaDocumentosComponent } from "app/modules/documentos/components/listaDocumentos/listaDocumentos.component";
import { CrearDocumentoComponent } from "app/modules/documentos/components/crearDocumento/crearDocumento.component";
import { DetallesDocumentoComponent } from "app/modules/documentos/components/detallesDocumento/detallesDocumento.component";
import { TablaRegistrosComponent } from "app/modules/documentos/components/tablaRegistros/tablaRegistros.component";
import { EditarCampoComponent } from "app/modules/documentos/components/editarCampos/editarCampos.component";
import { EditarDocumentoComponent } from "app/modules/documentos/components/editarDocumento/editarDocumento.component";

@NgModule({
    declarations: [
        DocumentosComponent,
        CabeceraComponent,
        ListaDocumentosComponent,
        CrearDocumentoComponent,
        DetallesDocumentoComponent,
        TablaRegistrosComponent,
        EditarCampoComponent,
        EditarDocumentoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AppMemoriaService,
        ErroresService,
        MessagesService,
        DocumentosMemoriaService,
        DocumentosService,
        TipoValoresService,
        CamposService,
        RegistrosService
    ],
    bootstrap: [
        DocumentosComponent
    ]
})
export class DocumentosModule { }
