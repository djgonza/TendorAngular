import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";
import { ErroresService } from "app/services/errores.service";

/* Models */
import { Usuario } from "app/models/usuario.model";
import { Token } from "app/models/token.model";

@Injectable()
export class LoginService {

    constructor(
        private http: HttpService,
        private appMemoriaService: AppMemoriaService,
        private erroresService: ErroresService
    ) { }

    //Registrar usuario en el servidor
    public loginUsuario(email: string, secret: string): Observable<any> {

        let url = '/usuarios/generarToken';
        return this.http.post(url, { email: email, secret: secret }).pipe(
            tap((token: any) => {
                this.appMemoriaService.token = new Token(token.cadena);
            }),
            catchError((error: HttpErrorResponse) => {
                let nuevoError: Error;
                switch (error.status) {
                    case 400:
                        nuevoError = new Error("¡Faltan parametros!");
                        this.erroresService.error = nuevoError;
                        throw error;
                    case 401:
                        nuevoError = new Error("¡Usuario o contraseña incorrecto!");
                        this.erroresService.error = nuevoError;
                        throw error;
                    default:
                        nuevoError = new Error("¡Error en el servidor");
                        this.erroresService.error = nuevoError;
                        throw error;
                }
            }));

    }

}