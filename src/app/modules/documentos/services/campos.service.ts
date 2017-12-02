import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from './../../../services/httpService.service';
import { TokenService } from './../../token/services/token.services';
import { MessagesService } from './../../../services/messages.service';
import { TipoValoresService } from './tipoValores.service';
import { DocumentosService } from './documentos.service';

import { Documento } from './../models/documento.model';
import { Campo } from './../models/campo.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';

@Injectable()
export class CamposService {

    public campos = new BehaviorSubject<Campo[]>(new Array());
    public campos$ = this.campos.asObservable();

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService,
        private tipoValoresService: TipoValoresService,
        private documentosService: DocumentosService) { }

    //Pide los campos de un documento y los añade
    public getCamposDeUnDocumento(documento: Documento): void {

        let url = '/campos/leerCamposDeUnDocumento';
        this.http.post(url, { documento: documento.getId() }, this.httpOptions)
            .subscribe((campos: any) => {

                let nuevosCampos = new Array();
                campos.map(campo => {
                    let tipoValor = new TipoValor(campo.tipoValor._id, campo.tipoValor.nombre, campo.tipoValor.tipo);
                    let nuevoCampo = new Campo(campo._id, campo.nombre, tipoValor);
                    nuevosCampos.push(nuevoCampo);
                });
                this.campos.next(nuevosCampos);

            }, this.catchsErrors);

    }

    //TODO: revisar para eliminar
    public crearCampo(nombre: string, tipoValor: string, documento: string) {

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

    public guardarCampos() {
        let url = '/campos/actualizarCampos';
        let params = {
            documento: this.documentosService.selectedDocumento.getValue().getId(),
            campos: this.campos.getValue()
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

    public addCampoVacio() {
        let tipoValor = this.tipoValoresService.tipoValores.getValue()[0];
        let nuevosCampos = this.campos.getValue();
        nuevosCampos.push(new Campo(null, "", tipoValor));
        this.campos.next(nuevosCampos);
    }

    public removeCampo(campo: Campo) {
        let nuevoCampos = this.campos.getValue();
        let index = nuevoCampos.indexOf(campo)
        nuevoCampos.splice(index, 1);
        this.campos.next(nuevoCampos);
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