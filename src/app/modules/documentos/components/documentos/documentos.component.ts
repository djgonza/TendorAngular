import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { AppMemoriaService } from "app/services/appMemoria.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";
import { TipoValoresService } from "app/modules/documentos/services/tipoValores.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";

@Component({
    selector: 'documentos',
    templateUrl: './documentos.component.html',
    styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

    constructor(
        private router: Router,
        private appMemoriaService: AppMemoriaService,
        public documentosMemoriaService: DocumentosMemoriaService,
        public documentosService: DocumentosService,
        public tipoValoresService: TipoValoresService
    ) {}

    public ngOnInit(): void {

        if (!this.appMemoriaService.token) {
            this.router.navigate(['/']);
            return;
        }

        let sb = this.documentosService.getTodosLosDocumentos()
        .subscribe(() => {
        }, (error: Error) => {
        }, () => {
            sb.unsubscribe();
        });

    }

}