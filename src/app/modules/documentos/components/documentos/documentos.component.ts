import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TokenService } from './../../../token/services/token.services';
import { DocumentosService } from './../../services/documentos.service';

import { Documento } from './../../models/documento.model';

@Component({
    selector: 'documentos',
    templateUrl: './documentos.component.html',
    styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

    private mostrarFormNuevoDocumento = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tokenService: TokenService,
        private documentosService: DocumentosService
    ) {}

    ngOnInit(): void {

        if (!this.tokenService.token.getValue()) {
            this.router.navigate(['/login']);
            return;
        }

    }

    leerDocumentos() {
        this.documentosService.getTodosLosDocumentos();
    }

    cambiarMostrarFormNuevoDocumento () {
        this.mostrarFormNuevoDocumento = !this.mostrarFormNuevoDocumento;
    }


}