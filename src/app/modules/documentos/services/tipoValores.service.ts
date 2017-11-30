import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from './../../../services/httpService.service';
import { TokenService } from './../../token/services/token.services';
import { MessagesService } from './../../../services/messages.service';

import { TipoValor } from './../models/tipoValor.model';

@Injectable()
export class TipoValoresService {

    public tipoValores = new BehaviorSubject<TipoValor[]>(new Array());

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService) { 
            this.leerTipoValoresDesdeServer();
        }

    //Pide los campos de un documento y los añade
    leerTipoValoresDesdeServer(): void {

        let url = '/tipoValores/leerTipoValores';
        this.http.get(url, this.httpOptions)
            .subscribe((tipoValoresServer) => {

                tipoValoresServer.map(tipoValor => {
                    let oldTipoValores = this.tipoValores.getValue();
                    let newTipoValor = new TipoValor(tipoValor._id, tipoValor.nombre, tipoValor.tipo);
                    oldTipoValores.push(newTipoValor);
                    this.tipoValores.next(oldTipoValores);
                });

            }, this.catchsErrors);

    }

    //Direccionador de errores
    //TODO: REvisar y mejorar
    private catchsErrors(error): void {
        switch (error.constructor) {
            case HttpErrorResponse:
                this.log(error.error);
                break;
            case Error:
                this.log(error.message);
                break;
            default:
                break;
        }
    }

    //Logguer
    private log(message: string) {
        this.messageService.add(message);
    }
}