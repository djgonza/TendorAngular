import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';

import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

import { Documento } from 'app/modules/documentos/models/documento.model';

@Component({
    selector: 'detalles-documento',
    templateUrl: './detallesDocumento.component.html',
    styleUrls: ['./detallesDocumento.component.css']
})
export class DetallesDocumentoComponent implements OnInit {

    @Input() documento: Documento = null;

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

    constructor(
        private documentosService: DocumentosService,
        private registrosService: RegistrosService
    ) { }

    public ngOnInit () {
    }

    private crearRegistro () {
        this.registrosService.addRegistroVacio();
    }

    private setEstadoPadre (estado: number) {
        this.documentosService.viewEstado.next(estado);
    }

}