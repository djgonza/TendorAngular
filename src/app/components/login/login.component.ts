import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Token } from './../../models/token.model';
import { LoginService } from './../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    @Input() email: String;
    @Input() secret: String;
    token: Token;

    constructor(
        private route: ActivatedRoute,
        private loginService: LoginService,
        private location: Location
    ) { }

    ngOnInit(): void {
        //this.getHero();
    }

    hacerLogin(): void {
        //Validar email y secret
        this.loginService.getToken(this.email, this.secret)
            .subscribe((token) => {
                this.token = token;
                this.location.go('/documentos')
            });
    }

}