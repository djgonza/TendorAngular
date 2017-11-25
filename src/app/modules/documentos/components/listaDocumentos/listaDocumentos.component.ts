import { Component, OnInit, Input } from '@angular/core';

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'lista-documentos',
    templateUrl: './listaDocumentos.component.html',
    styleUrls: ['./listaDocumentos.component.css']
})
export class ListaDocumentosComponent {

    @Input() documentos: Documento[] = null;

    constructor() {}
}