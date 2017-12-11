import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

/* Services */
import { LoginService } from "app/modules/login/services/login.service";
import { AppMemoriaService } from "app/services/appMemoria.service";

/* Models */

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Input() email: string;
    @Input() secret: string;
    private error: Error;

    constructor(
        private router: Router,
        private appMemoriaService: AppMemoriaService,
        private loginService: LoginService
    ) { }

    public ngOnInit() {
        if (this.appMemoriaService.token) {
            this.router.navigate(['/documentos']);
        }
    }

    public login(): void {
        if(this.validarCampos()) {
            let sb = this.loginService.loginUsuario(this.email, this.secret)
            .subscribe(() => {
                this.router.navigate(['/documentos']);
                }, (error: Error) => {
                }, () => {
                    sb.unsubscribe();
                });
        }
    }

    public googleLogin(): void {
        console.log("Google login");
    }

    public registrar () {
        this.router.navigate(['/registro']);
    }

    private validarCampos(): boolean {
        //TODO
        return true;
    }

}