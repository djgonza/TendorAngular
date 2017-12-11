import { Component, Input, HostListener, OnInit } from '@angular/core';

/* Services */
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Registro } from "app/modules/documentos/models/registro.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Campo } from "app/modules/documentos/models/campo.model";
import { Valores } from "app/modules/documentos/models/valores.model";
import { Valor } from "app/modules/documentos/models/valor.model";

@Component({
    selector: 'detalles-documento',
    templateUrl: './detallesDocumento.component.html',
    styleUrls: ['./detallesDocumento.component.css']
})
export class DetallesDocumentoComponent implements OnInit {

    @Input() documento: Documento = null;
    public editarRegistros: boolean = false;

    //Controla la ocultacion del btn ajustes
    public ajustesMenu: boolean = false;
    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (event.srcElement.id != 'ajustesBtn'){
            this.ajustesMenu = false;
            return;
        }
        this.ajustesMenu = true;
    }

    public ngOnInit () {
        console.log(this.documento, this.documentosMemoriaService.documentos);
        //this.registrosService.getRegistros(this.documento);
    }

    constructor(
        public documentosMemoriaService: DocumentosMemoriaService,
        public documentosService: DocumentosService,
        public registrosService: RegistrosService
    ) {}

    public changeEditarRegistros () {
        this.editarRegistros = !this.editarRegistros;
    }

    public crearRegistro () {
        this.registrosService.addRegistroVacio(this.documento);
    }

    public actualizarRegistros () {
        this.documento.registros.values.map((registro: Registro) => {
            this.registrosService.actualizarRegistro(registro, this.documento);
        });
        this.changeEditarRegistros();
    }

    public setEstadoPadre (estado: number) {
        this.documentosMemoriaService.documentoViewState = estado;
    }

}