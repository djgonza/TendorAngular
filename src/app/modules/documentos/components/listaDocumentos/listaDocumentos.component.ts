import { Component, Input } from '@angular/core';

/* Services */
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";

@Component({
    selector: 'lista-documentos',
    templateUrl: './listaDocumentos.component.html',
    styleUrls: ['./listaDocumentos.component.css']
})
export class ListaDocumentosComponent {

    @Input() documentos: Documento[] = null;

    constructor(
        public documentosService: DocumentosService,
        public documentosMemoriaService: DocumentosMemoriaService
    ) {}

    public seleccionarDocumento (documento: Documento): void {
        this.documentosMemoriaService.documentoSeleccionado = documento;
        this.documentosMemoriaService.documentoViewState = 3;
    }

    public crearDocumento (): void {
        this.documentosMemoriaService.documentoViewState = 2;
    }

}