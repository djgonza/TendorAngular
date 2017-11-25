import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Token } from './../models/token.model';
import { TokenService } from './../services/token.services';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

    @Input() email: String;
    @Input() secret: String;

    constructor(
        private route: ActivatedRoute,
        private tokenService: TokenService,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log(this.tokenService.getToken());
        if (this.tokenService.getToken()) {
            this.router.navigate(['/documentos']);
        }
    }

    //Pedimos el token al servicio
    pedirToken(): void {
        //TODO: Validar email y secret
        this.tokenService.getTokenDesdeElServidor(this.email, this.secret)
            .subscribe((token) => {
                if (token) this.router.navigate(['/documentos']);
            });
    }

}