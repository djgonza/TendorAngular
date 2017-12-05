import { Component, Input } from '@angular/core';

import { DocumentosService } from 'app/modules/documentos/services/documentos.service';
import { RegistrosService } from 'app/modules/documentos/services/registros.service'; 

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'lista-documentos',
    templateUrl: './listaDocumentos.component.html',
    styleUrls: ['./listaDocumentos.component.css']
})
export class ListaDocumentosComponent {

    @Input() documentos: Documento[] = null;

    constructor(
        private documentosService: DocumentosService,
        private registrosService: RegistrosService
    ) {}

    private emitCrearDocumento () {
        this.documentosService.viewEstado.next(2);
    }

    private seleccionarDocumento (documento: Documento) {
        this.registrosService.getNumeroRegistrosPorDocumento(documento);
        this.registrosService.resetSkipAndLimit();
        this.registrosService.getRegistros(documento);
        this.documentosService.setSelectedDocumento(documento);
        this.documentosService.viewEstado.next(3);
    }

}