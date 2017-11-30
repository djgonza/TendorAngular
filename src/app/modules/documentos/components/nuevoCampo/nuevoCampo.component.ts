import { Component, OnInit, Input } from '@angular/core';

import { Documento } from './../../models/documento.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';

import { TipoValoresService } from './../../services/tipoValores.service';
import { CamposService } from './../../services/campos.service';

@Component({
    selector: 'nuevo-campo',
    templateUrl: './nuevoCampo.component.html',
    styleUrls: ['./nuevoCampo.component.css']
})
export class NuevoCampoComponent {

    @Input() documento: Documento;
    @Input() nombre: string;
    @Input() tipoValorSeleccionado: string;

    constructor(private tipoValoresService: TipoValoresService, private camposService:  CamposService) { }

    //Valida el nombre
    validarNombre() {

    }

    crearCampo() {

        if (!this.documento || !this.tipoValorSeleccionado) {
            //Error
            return;
        }

        this.camposService.crearCampo(this.nombre, this.tipoValorSeleccionado, this.documento.getId());
        
    }

}