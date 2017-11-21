import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenService } from './../../../token/services/token.services';


@Component({
    selector: 'documentos',
    templateUrl: './documentos.component.html',
    styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        if (!this.tokenService.token){
            this.router.navigate(['/login']);
        }
    }

}