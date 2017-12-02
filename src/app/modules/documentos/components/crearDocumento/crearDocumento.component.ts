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
    private validador = {
        nombre: null
    };

    constructor(private documentosService: DocumentosService) { }

    private validarNombre(): boolean {

        if (this.nombre == null) {
            this.validador.nombre = {
                mensaje: "¡El nombre no puede estar vacio!"
            }
            return false;
        }

        if (this.nombre.length < 3 || this.nombre.length > 30) {
            this.validador.nombre = {
                mensaje: "¡El nombre tiene que tener mas de 3 caracteres y menos de 30!"
            }
            return false;
        }

        return true;

    }

    private crearDocumento() {
        if (this.validarNombre()) {
            this.documentosService.crearDocumento(this.nombre).subscribe(nuevoDocumento => {
                if (nuevoDocumento) {
                    this.setEstadoPadre$.emit(1);
                }
            }, error => {
                if (error.status == 401) {
                    this.validador.nombre = {
                        mensaje: "¡El nombre ya esta ocupado!"
                    }
                }
            });

        }
    }

    private volver(): void {
        this.setEstadoPadre$.emit(1);
    }

}