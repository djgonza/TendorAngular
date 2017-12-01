import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'barra-lateral',
    templateUrl: './barraLateral.component.html',
    styleUrls: ['./barraLateral.component.css']
})
export class BarraLateralComponent implements OnInit {

    @Input() documentos: Documento[] = null;
    @Input() selectedDocumento: Documento = null;

    @Output() selectDocumento$ = new EventEmitter<Documento>();
    @Output() crearDocumento$ = new EventEmitter<boolean>();

    private showContextMenuDocumentos = null;

    constructor() { }

    public ngOnInit(): void {

    }

    /* Events */
    private sendSelectDocumento(documento: Documento) {
        this.selectDocumento$.emit(documento);
    }
    private sendCreateDocumento() {
        this.crearDocumento$.emit(true);
    }
    /* End Events */

    private contextmenuDocumentos($event) {
        console.log($event);
        if ($event.type === "mouseleave") {
            this.showContextMenuDocumentos = null;
        }
        if ($event.type === "contextmenu") {
            this.showContextMenuDocumentos = {
                left: `${$event.pageX}px`,
                top: `${$event.pageY}px`
            };
        }
        $event.preventDefault();
    }

}