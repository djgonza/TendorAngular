import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

import { Campo } from 'app/modules/documentos/models/campo.model';


@Component({
    selector: 'tabla-registros',
    templateUrl: './tablaRegistros.component.html',
    styleUrls: ['./tablaRegistros.component.css']
})
export class TablaRegistrosComponent implements OnInit {

    @Input() campos: Campo[];
    private modoEdicion: boolean = true;

    constructor(
        private documentosService: DocumentosService,
        private registrosService: RegistrosService
    ) { }

    public ngOnInit () {
    }

    private addCampos () {
        
    }

    private setEstadoPadre(estado: number): void {
        this.documentosService.viewEstado.next(estado);
    }

}