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
export class DocumentosService {

    private documentos = new BehaviorSubject<Documento[]>(new Array());
    public documentos$ = this.documentos.asObservable();

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService) { }

    //Leer todos los documentos del servidor
    getTodosLosDocumentos(): void {

        let url = '/documentos/leerTodosLosDocumentos';

        this.http
            .get(url, this.httpOptions)
            .subscribe((documentosServer: any) => {

                //Validamos la respuesta desde el servidor
                if (!(documentosServer instanceof Array)) {
                    let error = new Error("Respuesta incorrecta desde el servidor");
                    throw error;
                }

                //Vaciamos los documentos actuales
                this.clearDocumentos();

                //Cargamos los nuevos documentos
                documentosServer.map((documentoServer) => {
                    //Creamos el documento
                    let nuevoDocumento = new Documento(documentoServer._id, documentoServer.nombre);
                    //Pedimos los campos de ese documento
                    this.getCamposDeUnDocumento(nuevoDocumento);

                    //Añadir solo nuevos documentos
                    let oldDocumentos = this.documentos.getValue();
                    oldDocumentos.push(nuevoDocumento);
                    this.documentos.next(oldDocumentos);
                });

            }, this.catchsErrors);

    }

    //Crea un documento nuevo en el servidor
    crearDocumento (nombre): void {
        let url = '/documentos/crearDocumento';
        this.http.post(url, {nombre: nombre}, this.httpOptions)
        .subscribe((nuevoDocumentoServer) => {
            if (nuevoDocumentoServer){
                //Creamos el documento
                let nuevoDocumento = new Documento(nuevoDocumentoServer._id, nuevoDocumentoServer.nombre);
                //Pedimos los campos de ese documento
                this.getCamposDeUnDocumento(nuevoDocumento);
                let oldDocumentos = this.documentos.getValue();
                oldDocumentos.push(nuevoDocumento);
                this.documentos.next(oldDocumentos);
            }
        }, (error) => {
            console.log(error);
        })
    }

    //Limpia el objecto documentos
    clearDocumentos(): void {
        this.documentos.next(new Array());
    }

    //Pide los campos de un documento y los añade
    getCamposDeUnDocumento(documento: Documento): void {

        let url = '/campos/leerCamposDeUnDocumento';
        this.http.post(url, { documento: documento.getId() }, this.httpOptions)
            .subscribe((campos: Campo[]) => {

                documento.getBehaviorSubjectCampos().next(campos);

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