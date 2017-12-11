import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Registros } from "app/modules/documentos/models/registros.model";
import { Registro } from "app/modules/documentos/models/registro.model";
import { Valores } from "app/modules/documentos/models/valores.model";
import { Valor } from "app/modules/documentos/models/valor.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Campo } from "app/modules/documentos/models/campo.model";


@Injectable()
export class RegistrosService {

    constructor(
        private http: HttpService,
        private appMemoriaService: AppMemoriaService,
        private documentosMemoriaService: DocumentosMemoriaService
    ) { }

    //Leer todos los documentos del servidor
    public getRegistros(documento: Documento): void {

        let url = '/registros/leerRegistrosPorDocumento';
        let body = {
            documento: documento.id,
            skip: documento.registros.skip,
            limit: documento.registros.limit
        }
        let ob = this.http
            .post(url, body, this.appMemoriaService.httpOptions)
            .subscribe((registrosServer: any) => {

                //Validamos la respuesta desde el servidor
                if (!(registrosServer instanceof Array)) {
                    let error = new Error("Respuesta incorrecta desde el servidor");
                    throw error;
                }

                //Creamos los nuevos registros
                documento.registros.values = registrosServer.map(registro => {
                    return this.parseObjectRegistro(registro, documento);
                });

            }, (error: HttpErrorResponse) => {
                console.log(error);
            }, () => {
                ob.unsubscribe();
            });

    }

    //Crea un documento nuevo en el servidor
    public crearRegistro(registro: Registro, documento: Documento): void {
        let url = '/registros/crearRegistro';
        let ob = this.http.post(url, { registro: registro.toJson() }, this.appMemoriaService.httpOptions)
            .subscribe((nuevoRegistroServer) => {
                //Creamos el registro
                let nuevoRegistro = this.parseObjectRegistro(nuevoRegistroServer, documento);
                //Añadimos el nuevo Registro a la memoria
                let nuevosRegistros = documento.registros.values;
                nuevosRegistros.push(nuevoRegistro);
                documento.registros.values = nuevosRegistros;
            }, (error: HttpErrorResponse) => {
                console.log(error);
            }, () => {
                ob.unsubscribe();
            });
    }

    //Actualizar un registro en el servidor
    public actualizarRegistro(registro: Registro, documento: Documento): void {
        let url = '/registros/actualizarRegistro';
        console.log(registro.toJson());
        let ob = this.http.post(url, { registro: registro.toJson() }, this.appMemoriaService.httpOptions)
            .subscribe((registroActualizado) => {

                let nuevosRegistros = documento.registros.values;
                let nuevoRegistro = this.parseObjectRegistro(registroActualizado, documento);

                nuevosRegistros.find((registro, i) => {
                    if (registro.id == nuevoRegistro.id) {
                        registro = nuevoRegistro;
                        return true;
                    }
                });

            }, (error: HttpErrorResponse) => {
                console.log(error);
            }, () => {
                ob.unsubscribe();
            });
    }

    //Lee el numero de registros de un documento
    public getNumeroRegistrosPorDocumento(documento: Documento): void {
        let url = '/registros/cantidadDeRegistrosPorDocumento';
        let ob = this.http.post(url, { documento: documento.id }, this.appMemoriaService.httpOptions)
            .subscribe((cantidadRegistros) => {
                documento.registros.total = cantidadRegistros.value;
            }, (error: HttpErrorResponse) => {
                console.log(error);
            }, () => {
                ob.unsubscribe();
            });
    }

    //Añade un registro vacio para poder guardarlo mas tarde
    public addRegistroVacio(documento: Documento) {
        let nuevoRegistro = new Registro(null, documento);
        let nuevosValores = documento.campos.values.map((campo: Campo) => {
            return new Valor(null, campo, null);
        });
        nuevoRegistro.valores = new Valores();
        nuevoRegistro.valores.values = nuevosValores;
        this.crearRegistro(nuevoRegistro, documento);
    }

    //Actualiza los campos del registro
    public actualizarCamposDelRegistro(registro: Registro) {
    }

    //Crear un objeto registro desde un json
    private parseObjectRegistro(registro: any, documento: Documento): Registro {

        let nuevoRegistro = new Registro(registro._id, this.documentosMemoriaService.documentoSeleccionado, registro.fechaCreacion);
        let nuevosValores = new Valores();
        nuevosValores.values = registro.valores.map(valor => {
            let campo = documento.campos.values
                .find((campo: Campo) => {
                    if (campo.id == valor.campo) { return true; }
                });
            return new Valor(valor._id, campo, valor.valor);
        });

        //Guardamos los valores en el registro
        nuevoRegistro.valores = nuevosValores;

        return nuevoRegistro;

    }

}