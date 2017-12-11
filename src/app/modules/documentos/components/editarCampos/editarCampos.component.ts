import { Component, Input, OnInit } from '@angular/core';

/* Services */
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { CamposService } from "app/modules/documentos/services/campos.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Campo } from "app/modules/documentos/models/campo.model";

@Component({
    selector: 'editar-campos',
    templateUrl: './editarCampos.component.html',
    styleUrls: ['./editarCampos.component.css']
})
export class EditarCampoComponent implements OnInit {

    @Input() documento: Documento;

    public validador = new Array();

    constructor(
        public documentosMemoriaService: DocumentosMemoriaService,
        public documentosService: DocumentosService,
        public camposService: CamposService
    ) { }

    public ngOnInit() {
        console.log(this.documento, this.documentosMemoriaService);
    }

    public setEstadoPadre(estado: number): void {
        this.documentosMemoriaService.documentoViewState = estado;
    }

    public validarCampos() {
        this.validador = new Array();
        let campos: Campo[] = this.documento.campos.values;
        let estado = true;
        campos.map(campo => {
            /*let valido = {
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
            this.validador.push(valido);*/
        });
        return estado;
    }

    public actualizarCampos() {
        if (this.validarCampos()) {
            let ob = this.documentosService.actualizarDocumento(this.documento)
            .subscribe(
                () => {},
                (error: Error) => {},
                () => {
                    ob.unsubscribe();
                }
            );
            this.setEstadoPadre(3);
        }
    }

    public addCampoVacio() {
        this.camposService.addCampoVacio(this.documento);
    }

    public removeCampo(campo: Campo) {
        /*if (confirm(`¿Seguro que desea eliminar el campo ${campo.getNombre()} ?`)) {
            this.documentosService.removeCampo(campo);
            this.validarCampos();
        }*/
    }

}