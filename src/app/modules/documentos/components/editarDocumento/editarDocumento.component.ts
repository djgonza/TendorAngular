import { Component, OnInit, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';

import { DocumentosService } from './../../services/documentos.service';

import { Documento } from './../../models/documento.model';


@Component({
    selector: 'editar-documento',
    templateUrl: './editarDocumento.component.html',
    styleUrls: ['./editarDocumento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

    @Input() documento: Documento = null;
    @Input() nombre: string;
    @Output() setEstadoPadre$ = new EventEmitter<number>();

    constructor(private documentosService: DocumentosService) { }

    public ngOnInit() {
        this.nombre = this.documento.getNombre();
    }

    private setEstadoPadre(estado: number): void {
        this.setEstadoPadre$.emit(estado);
    }

    private actualizarDocumento (): void {
        //TODO: actualizar documento en el servicio
        this.setEstadoPadre(1);
    }

}