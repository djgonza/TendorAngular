import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'lista-documentos',
    templateUrl: './listaDocumentos.component.html',
    styleUrls: ['./listaDocumentos.component.css']
})
export class ListaDocumentosComponent {

    @Input() documentos: Documento[] = null;
    @Output() setEstadoPadre$ = new EventEmitter<number>();

    constructor() {}

    private emitCrearDocumento () {
        this.setEstadoPadre$.emit(2);
    }

}