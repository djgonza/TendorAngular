import { Component, OnInit, Input } from '@angular/core';

import { Documento } from 'app/modules/documentos/models/documento.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';
import { Campo } from 'app/modules/documentos/models/campo.model';

import { DocumentosService } from 'app/modules/documentos/services/documentos.service';
import { TipoValoresService } from 'app/modules/documentos/services/tipoValores.service';

@Component({
    selector: 'editar-campos',
    templateUrl: './editarCampos.component.html',
    styleUrls: ['./editarCampos.component.css']
})
export class EditarCampoComponent implements OnInit {

    @Input() documento: Documento;

    private validador = new Array();

    constructor(
        private tipoValoresService: TipoValoresService,
        private documentosService: DocumentosService
    ) { }

    public ngOnInit() {}

    private setEstadoPadre(estado: number): void {
        this.documentosService.viewEstado.next(estado);
    }

    private validarCampos() {
        this.validador = new Array();
        let campos = this.documento.getCampos();
        let estado = true;
        campos.map(campo => {
            let valido = {
                valido: true,
                mensaje: ""
            };
            if (campo.getNombre().length < 3) {
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
        if (this.validarCampos()) {
            //Actualizar
            this.documentosService.actualizarDocumento(this.documento);
            this.setEstadoPadre(3);
        }

    }

    private addCampoVacio() {
        this.documentosService.addCampoVacio();
    }

    private removeCampo(campo: Campo) {
        if (confirm(`¿Seguro que desea eliminar el campo ${campo.getNombre()} ?`)) {
            this.documentosService.removeCampo(campo);
            this.validarCampos();
        }
    }

}