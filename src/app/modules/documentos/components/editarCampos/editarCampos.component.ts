import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Documento } from './../../models/documento.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';
import { Campo } from 'app/modules/documentos/models/campo.model';

import { TipoValoresService } from './../../services/tipoValores.service';
import { CamposService } from './../../services/campos.service';

@Component({
    selector: 'editar-campos',
    templateUrl: './editarCampos.component.html',
    styleUrls: ['./editarCampos.component.css']
})
export class EditarCampoComponent implements OnInit {

    @Output() setEstadoPadre$ = new EventEmitter<number>();
    @Input() documento: Documento;

    private validador = new Array();

    constructor(private tipoValoresService: TipoValoresService, private camposService: CamposService) { }

    public ngOnInit () {
        this.camposService.campos$.subscribe(campos => {
            campos.map(campo => {
                console.log(campo);
            })
        })
    }

    private setEstadoPadre(estado: number): void {
        this.setEstadoPadre$.emit(estado);
    }

    private validarCampos () {
        this.validador = new Array();
        let campos = this.camposService.campos.getValue();
        let estado = true;
        campos.map(campo => {
            let valido = {
                valido: true,
                mensaje: ""
            };
            if (campo.getNombre().length < 3){
                valido.valido = false;
                estado = false;
                valido.mensaje = "El campo tiene que contener 3 o mas caracteres";
            }
            if (campo.getNombre().length > 25) {
                valido.valido = false;
                estado = false;
                valido.mensaje = "El campo no puede superar los 25 caracteres";
            }
            //Caracteres estraños
            if (campo.getNombre().replace(/[^a-zA-Z 0-9áÁéÉíÍóÓúÚñÑ]+/g, '') !== campo.getNombre()) {
                valido.valido = false;
                estado = false;
                valido.mensaje = "El campo contiene caracteres no validos";
            }
            this.validador.push(valido);
        });
        return estado;
    }

    private actualizarCampos() {
         //TODO: Validar y actualizar
        if (this.validarCampos()) {
            //Actualizar
            this.camposService.guardarCampos();
            this.setEstadoPadre(3);
        }

    }

    private addCampoVacio () {
        this.camposService.addCampoVacio();
    }

    private removeCampo (campo: Campo) {
        if (confirm(`¿Seguro que desea eliminar el campo ${campo.getNombre()} ?`)) {
            this.camposService.removeCampo(campo);
        }
    }

}