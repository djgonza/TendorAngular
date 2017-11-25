import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TokenService } from './../../token/services/token.services';
import { MessagesService } from './../../../services/messages.service';

import { Documento } from './../models/documento.model';

@Injectable()
export class DocumentosService {

    public documentos: Documento[] = new Array();

    private serviceUrl = 'http://localhost:3000';  // URL to web api
    private httpOptions = {
        headers: new HttpHeaders()
            //.set('Authorization', this.tokenService.getCadenaToken())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpClient,
        private messageService: MessagesService,
        private tokenService: TokenService) { }

    //Leer todos los documentos del servidor
    getTodosLosDocumentos(): void {

        let url = `${this.serviceUrl}/documentos/leerTodosLosDocumentos`;

        this.http
            .get<Documento[]>(url, this.httpOptions)
            .toPromise()
            .then((documentos: Documento[]) => {
                
                //Validamos la respuesta desde el servidor
                if (!(documentos instanceof Array)) {
                    let error = new Error("Respuesta incorrecta desde el servidor");
                    throw error;
                }

                documentos.map((documento: any) => {
                    //Validamos los datos
                    this.documentos.push(new Documento(documento._id, documento.nombre));
                });
            })
            .catch(error => {
                this.catchsErrors(error);
            });

    }

    //Direccionador de errores
    private catchsErrors (error: any): void {
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