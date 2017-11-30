import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from './../../../services/httpService.service';
import { TokenService } from './../../token/services/token.services';
import { MessagesService } from './../../../services/messages.service';

import { Documento } from './../models/documento.model';
import { Campo } from './../models/campo.model';

@Injectable()
export class CamposService {

    //TODO: Guardamos los campos en un array y los buscaremos por id de documento
    private campos = new BehaviorSubject<Campo[]>(new Array());
    public campos$ = this.campos.asObservable();

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService) { }

    //Pide los campos de un documento y los añade
    public getCamposDeUnDocumento(documento: Documento): void {

        let url = '/campos/leerCamposDeUnDocumento';
        this.http.post(url, { documento: documento.getId() }, this.httpOptions)
            .subscribe((campos: Campo[]) => {
                //TODO: Guardar los campos en this.campos
                documento.getBehaviorSubjectCampos().next(campos);

            }, this.catchsErrors);

    }

    public crearCampo (nombre: string, tipoValor: string, documento: string) {

        let url = '/campos/crearCampo';
        let params = {
            nombre: nombre,
            tipoValor: tipoValor,
            documento: documento
        }
        this.http.post(url, params, this.httpOptions)
            .subscribe((campo: any) => {
                //Añadimos el campo recien creado
                let nuevoCampo = new Campo(campo._id, campo.nombre, campo.tipoValor)
                let nuevosCampos = this.campos.getValue();
                nuevosCampos.push(nuevoCampo);
                this.campos.next(nuevosCampos);

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