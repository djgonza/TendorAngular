import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';

/* Services */
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";


@Component({
    selector: 'editar-documento',
    templateUrl: './editarDocumento.component.html',
    styleUrls: ['./editarDocumento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

    @Input() documento: Documento = null;

    constructor (
        public documentosMemoriaService: DocumentosMemoriaService,
        public documentosService: DocumentosService
    ) { }

    public ngOnInit() {
    }

    public setEstadoPadre(estado: number): void {
        this.documentosMemoriaService.documentoViewState = estado;
    }

    public actualizarDocumento (): void {
        let ob = this.documentosService.actualizarDocumento(this.documento)
        .subscribe(
            () => {},
            (error: Error) => {},
            () => { 
                ob.unsubscribe();
                this.setEstadoPadre(1);
            },
        );
        
    }

}