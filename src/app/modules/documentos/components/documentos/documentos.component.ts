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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tokenService: TokenService,
        private documentosService: DocumentosService
    ) {}

    ngOnInit(): void {


        if (!this.tokenService.getCadenaToken()){
            this.router.navigate(['/login']);
            return;
        }

        this.documentosService.getTodosLosDocumentos();

    }


}