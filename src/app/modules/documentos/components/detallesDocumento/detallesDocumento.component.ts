import { Component, OnInit, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';

import { CamposService } from './../../services/campos.service';

import { Documento } from './../../models/documento.model';


@Component({
    selector: 'detalles-documento',
    templateUrl: './detallesDocumento.component.html',
    styleUrls: ['./detallesDocumento.component.css']
})
export class DetallesDocumentoComponent implements OnInit {

    @Input() documento: Documento = null;
    @Output() setEstadoPadre$ = new EventEmitter<number>();

    //Controla la ocultacion del btn ajustes
    private ajustesMenu: boolean = false;
    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (event.srcElement.id != 'ajustesBtn'){
            this.ajustesMenu = false;
            return;
        }
        this.ajustesMenu = true;
    }

    constructor(private camposService: CamposService) { }

    public ngOnInit () {
        this.camposService.getCamposDeUnDocumento(this.documento);
    }

    private crearRegistro () {

    }

    private setEstadoPadre (estado: number) {
        this.setEstadoPadre$.emit(estado);
    }

}