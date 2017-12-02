import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from './../../../services/httpService.service';
import { TokenService } from './../../token/services/token.services';
import { CamposService } from './campos.service';
import { MessagesService } from './../../../services/messages.service';

import { Documento } from './../models/documento.model';
import { Campo } from './../models/campo.model';

@Injectable()
export class DocumentosService {

    private documentos = new BehaviorSubject<Documento[]>(new Array());
    public documentos$ = this.documentos.asObservable();

    private selectedDocumento = new BehaviorSubject<Documento>(null);
    public selectedDocumento$ = this.selectedDocumento.asObservable();

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService,
        private camposService: CamposService) { }

    //Leer todos los documentos del servidor
    public getTodosLosDocumentos(): void {

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
                    this.camposService.getCamposDeUnDocumento(nuevoDocumento);

                    //Añadir solo nuevos documentos
                    let oldDocumentos = this.documentos.getValue();
                    oldDocumentos.push(nuevoDocumento);
                    this.documentos.next(oldDocumentos);
                });

            }, this.catchsErrors);

    }

    //Crea un documento nuevo en el servidor
    public crearDocumento (nombre): Observable<any> {
        let url = '/documentos/crearDocumento';
        let llamada = this.http.post(url, { nombre: nombre }, this.httpOptions);
        llamada.subscribe((nuevoDocumentoServer) => {
            if (nuevoDocumentoServer){
                //Creamos el documento
                let nuevoDocumento = new Documento(nuevoDocumentoServer._id, nuevoDocumentoServer.nombre);
                //Pedimos los campos de ese documento
                this.camposService.getCamposDeUnDocumento(nuevoDocumento);
                //Añadimos el nuevo Documento a la memoria
                let oldDocumentos = this.documentos.getValue();
                oldDocumentos.push(nuevoDocumento);
                this.documentos.next(oldDocumentos);
                //Seleccionamos el nuevo documento
                this.selectedDocumento.next(nuevoDocumento);
            }
        }, (error) => {
            console.log(error);
        });
        return llamada;
    }

    public setSelectedDocumento (documento: Documento) {
        this.selectedDocumento.next(documento);
    }

    //Limpia el objecto documentos
    private clearDocumentos(): void {
        this.documentos.next(new Array());
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