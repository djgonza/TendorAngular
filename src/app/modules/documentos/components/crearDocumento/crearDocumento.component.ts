import { Component, OnInit, Input } from '@angular/core';

import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { ErroresService } from "app/services/errores.service";
import { MessagesService } from "app/services/messages.service";

@Component({
    selector: 'crear-documento',
    templateUrl: './crearDocumento.component.html',
    styleUrls: ['./crearDocumento.component.css']
})
export class CrearDocumentoComponent {

    @Input() nombre: String;

    constructor (
        public documentosService: DocumentosService,
        public documentosMemoriaService: DocumentosMemoriaService,
        public erroresService: ErroresService,
        public messagesService: MessagesService
    ) { }

    public validarNombre(): boolean {
        if (this.nombre == null) {
            this.erroresService.error = new Error("¡El nombre no puede estar vacio!");
            return false;
        }
        if (this.nombre.length < 3 || this.nombre.length > 30) {
            this.erroresService.error = new Error("¡El nombre tiene que tener mas de 3 caracteres y menos de 30!");
        }
        return true;
    }

    public crearDocumento() {
        if (this.validarNombre()) {
            let ob = this.documentosService.crearDocumento(this.nombre)
                .subscribe(() => {
                    this.documentosMemoriaService.documentoViewState = 1;
                }, (error: Error) => {
                }, () => {
                    ob.unsubscribe();
                });
        }
    }

    public setEstadoPadre(estado: number): void {
        this.documentosMemoriaService.documentoViewState = estado;
    }

}