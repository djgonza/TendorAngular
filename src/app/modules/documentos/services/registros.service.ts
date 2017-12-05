import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from 'app/services/httpService.service';
import { TokenService } from 'app/modules/token/services/token.services';
import { MessagesService } from 'app/services/messages.service';
import { DocumentosService } from "app/modules/documentos/services/documentos.service";

import { Documento } from 'app/modules/documentos/models/documento.model';
import { Campo } from 'app/modules/documentos/models/campo.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';
import { Registro } from "app/modules/documentos/models/registros.model";
import { Valor } from "app/modules/documentos/models/valor.model";

@Injectable()
export class RegistrosService {

    public registros = new BehaviorSubject<Registro[]>(new Array());
    public registros$ = this.registros.asObservable();

    public skipRegistros = new BehaviorSubject<number>(0);
    public limitRegistros = new BehaviorSubject<number>(20);
    public totalRegistros = new BehaviorSubject<number>(0);

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService,
        private documentosService: DocumentosService
    ) { }

    //Leer todos los documentos del servidor
    public getRegistros(documento: Documento): void {

        let url = '/registros/leerRegistrosPorDocumento';
        let body = {
            documento: documento.getId(),
            skip: this.skipRegistros.getValue(),
            limit: this.limitRegistros.getValue()
        }
        this.http
            .post(url, body, this.httpOptions)
            .subscribe((registrosServer: any) => {

                //Validamos la respuesta desde el servidor
                if (!(registrosServer instanceof Array)) {
                    let error = new Error("Respuesta incorrecta desde el servidor");
                    throw error;
                }

                //Vaciamos los documentos actuales
                this.clearRegistros();

                let nuevosRegistros = new Array<Registro>();

                //Cargamos los nuevos documentos
                registrosServer.map((registroServer) => {
                    //Creamos el documento
                    let nuevoRegistro = this.parseObjectRegistro(registroServer);
                    nuevosRegistros.push(nuevoRegistro);
                });

                this.registros.next(nuevosRegistros);

            }, this.catchsErrors);

    }

    //Crea un documento nuevo en el servidor
    public crearRegistro(registro): Observable<any> {
        let url = '/registros/crearRegistro';
        let llamada = this.http.post(url, { registro: registro  }, this.httpOptions);
        let bs = new BehaviorSubject<Registro>(null);
        llamada.subscribe((nuevoRegistroServer) => {
            //Creamos el registro
            let nuevoRegistro = this.parseObjectRegistro(nuevoRegistroServer);
            //Añadimos el nuevo Registro a la memoria
            let nuevosRegistros = this.registros.getValue();
            nuevosRegistros.push(nuevoRegistro);
            this.registros.next(nuevosRegistros);
            bs.next(nuevoRegistro);
        }, (error) => {
            console.log(error);
            bs.error(error);
        });
        return bs.asObservable();
    }

    //Actualizar un registro en el servidor
    public actualizarRegistro(registro: Registro): Observable<any> {
        let url = '/documentos/actualizarRegistro';
        let llamada = this.http.post(url, { registro: registro }, this.httpOptions);
        llamada.subscribe((registroActualizado) => {
            let nuevosRegistros = this.registros.getValue();
            let nuevoDocumento = this.parseObjectRegistro(registroActualizado);

            nuevosRegistros.find((registro, i) => {
                if (registro.getId() == registroActualizado.getId()) {
                    nuevosRegistros[i] = registroActualizado;
                    return true;
                }
            });
            this.registros.next(nuevosRegistros);

        }, (error) => {
            console.log(error);
        });
        return llamada;
    }

    //Lee el numero de registros de un documento
    public getNumeroRegistrosPorDocumento(documento: Documento): Observable<any> {
        let url = '/registros/cantidadDeRegistrosPorDocumento';
        let llamada = this.http.post(url, { documento: documento.getId() }, this.httpOptions);
        llamada.subscribe((cantidadRegistros) => {
            
            //this.totalRegistros.next(cantidadRegistros);
            documento.setCantidadRegistros(cantidadRegistros.value);

        }, (error) => {
            console.log(error);
        });
        return llamada;
    }

    public setTotalRegistros (cantidadRegistros: number) {
        this.totalRegistros.next(cantidadRegistros);
    }

    //Resetea los parametros de busqueda para los registros
    public resetSkipAndLimit(): void {
        this.skipRegistros.next(0);
        this.limitRegistros.next(20);
    }

    //Añade un registro vacio para poder guardarlo mas tarde
    public addRegistroVacio () {
        let documento = this.documentosService.selectedDocumento.getValue();
        let campos = new Array<Valor>();
        documento.getCampos().map(campo => {
            switch (campo.getTipoValor().getTipo()) {
                case "String":
                    campos.push(new Valor(campo, ""));
                    break;
                case "Number":
                    campos.push(new Valor(campo, 0));
                    break;
                case "Boolean":
                    campos.push(new Valor(campo, false));
                    break;
                default:
                    break;
            }
            let valor = new Valor(campo, null);
        });
        let nuevoRegistro = new Registro(null, documento, null, campos);

        //Añadimos el nuevo Registro a la memoria
        let nuevosRegistros = this.registros.getValue();
        nuevosRegistros.push(nuevoRegistro);
        this.registros.next(nuevosRegistros);
    }

    //Actualiza los campos del registro
    public actualizarCamposDelRegistro (registro: Registro) {
        
    }

    //Limpia el objecto documentos
    private clearRegistros(): void {
        this.registros.next(new Array());
    }

    //Crear un documento desde los datos del servidor
    private parseObjectRegistro(registro: any): Registro {

        let documento = this.documentosService.selectedDocumento.getValue();
        let nuevosCampos = new Array<Valor>();
        registro.campos.map(campo => {
            let campoDocumento = documento.getCampos().find(campoMap => {
                if (campoMap.getId() == campo.campo) return true;
            });
            nuevosCampos.push(new Valor(campoDocumento, campo.valor));
        });

        return new Registro(registro._id, documento, registro.fechaCreacion, nuevosCampos);

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