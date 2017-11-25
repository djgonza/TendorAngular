import { Component, OnInit, Input } from '@angular/core';

import { DocumentosService } from './../../services/documentos.service';

@Component({
    selector: 'nuevo-documento',
    templateUrl: './nuevoDocumento.component.html',
    styleUrls: ['./nuevoDocumento.component.css']
})
export class NuevoDocumentoComponent {

    @Input() nombre: String;

    constructor(private documentosService: DocumentosService) { }

    //Valida el nombre
    validarNombre () {

    }

    crearDocumento () {

        if (this.nombre.length > 3 && this.nombre.length < 50) {
            this.documentosService.crearDocumento(this.nombre);
        }
    }

}