import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DocumentosService } from './../../services/documentos.service'; 

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'lista-documentos',
    templateUrl: './listaDocumentos.component.html',
    styleUrls: ['./listaDocumentos.component.css']
})
export class ListaDocumentosComponent {

    @Input() documentos: Documento[] = null;
    @Output() setEstadoPadre$ = new EventEmitter<number>();

    constructor(private documentosService: DocumentosService) {}

    private emitCrearDocumento () {
        this.setEstadoPadre$.emit(2);
    }

    private seleccionarDocumento (documento: Documento) {
        this.documentosService.setSelectedDocumento(documento);
        this.setEstadoPadre$.emit(3);
    }

}