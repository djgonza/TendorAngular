import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DocumentosService } from './../../services/documentos.service';

@Component({
    selector: 'crear-documento',
    templateUrl: './crearDocumento.component.html',
    styleUrls: ['./crearDocumento.component.css']
})
export class CrearDocumentoComponent {

    @Input() nombre: String;
    @Output() setEstadoPadre$ = new EventEmitter<number>();

    constructor(private documentosService: DocumentosService) { }

    //Valida el nombre
    private validarNombre() {

    }

    private crearDocumento() {

        if (this.nombre.length > 3 && this.nombre.length < 50) {
            this.documentosService.crearDocumento(this.nombre);
        }
    }

    private volver () {
        this.setEstadoPadre$.emit(1);
    }

}