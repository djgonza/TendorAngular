import { Component, Input, OnInit } from '@angular/core';

/* Services */
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Registros } from "app/modules/documentos/models/registros.model";
import { Registro } from "app/modules/documentos/models/registro.model";
import { Campo } from "app/modules/documentos/models/campo.model";
import { Valor } from "app/modules/documentos/models/valor.model";

@Component({
    selector: 'tabla-registros',
    templateUrl: './tablaRegistros.component.html',
    styleUrls: ['./tablaRegistros.component.css']
})
export class TablaRegistrosComponent implements OnInit {

    @Input() documento: Documento;
    @Input() edicion: boolean;

    constructor(
        public documentosMemoriaService: DocumentosMemoriaService,
        public documentosService: DocumentosService,
        public registrosService: RegistrosService
    ) { }

    ngOnInit() {
        this.registrosService.getRegistros(this.documento);
        console.log(this.documento);
    }

    public addCampos() {
    }

    public setEstadoPadre(estado: number): void {
        this.documentosMemoriaService.documentoViewState = estado;
    }

    public buscarValorRegistroPorCampo (registro: Registro, campo: Campo): Valor {

        let valor = registro.valores.values.find((value: Valor) => {
            if (value.campo.id == campo.id) {
                return true;
            }
        });

        if (valor == null) {
            valor = new Valor(null, campo, null);
            let valores = registro.valores.values;
            valores.push(valor);
            registro.valores.values = valores;
        }

        return valor;

    }

}