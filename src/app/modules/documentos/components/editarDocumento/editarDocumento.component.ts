import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';

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

    constructor(private documentosService: DocumentosService) { }

    public ngOnInit() {
        this.nombre = this.documento.getNombre();
    }

    private setEstadoPadre(estado: number): void {
        this.documentosService.viewEstado.next(estado);
    }

    private actualizarDocumento (): void {
        this.documento.setNombre(this.nombre);
        this.documentosService.actualizarDocumento(this.documento);
        this.setEstadoPadre(1);
    }

}