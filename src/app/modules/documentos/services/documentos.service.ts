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
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { ErroresService } from "app/services/errores.service";
import { RegistrosService } from "app/modules/documentos/services/registros.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Campo } from "app/modules/documentos/models/campo.model";

@Injectable()
export class DocumentosService {

    constructor(
        private http: HttpService,
        private appMemoriaService: AppMemoriaService,
        private documentosMemoriaService: DocumentosMemoriaService,
        private erroresService: ErroresService,
        private registrosService: RegistrosService
    ) { }

    //Leer todos los documentos del servidor y los carga en la memoria
    public getTodosLosDocumentos(): Observable<any> {

        let url = '/documentos/leerTodosLosDocumentos';
        return this.http.get(url, this.appMemoriaService.httpOptions).pipe(
            tap((documentosServer: any) => {
                this.documentosMemoriaService.documentos = documentosServer
                    .map((documentoServer) => {
                        let documento = this.parseObjectDocumento(documentoServer);
                        this.registrosService.getNumeroRegistrosPorDocumento(documento);
                        return documento
                    });
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
            })
        )

    }

    //Crea un documento nuevo en el servidor y la memoria
    public crearDocumento(nombre): Observable<any> {
        let url = '/documentos/crearDocumento';
        return this.http.post(url, { nombre: nombre }, this.appMemoriaService.httpOptions).pipe(
            tap((nuevoDocumentoServer: any) => {
                //Creamos el documento
                let nuevoDocumento = this.parseObjectDocumento(nuevoDocumentoServer);
                //Añadimos el nuevo Documento a la memoria
                this.documentosMemoriaService.addDocumento(nuevoDocumento);
                //Seleccionamos el nuevo documento
                this.documentosMemoriaService.documentoSeleccionado = nuevoDocumento;
            }), catchError((error: HttpErrorResponse) => {
                let nuevoError: Error;
                switch (error.status) {
                    case 400:
                        nuevoError = new Error("¡Faltan parametros!");
                        this.erroresService.error = nuevoError;
                        throw error;
                    case 401:
                        nuevoError = new Error("Ya existe otro documento con ese nombre");
                        this.erroresService.error = nuevoError;
                        throw error;
                    default:
                        nuevoError = new Error("¡Error en el servidor");
                        this.erroresService.error = nuevoError;
                        throw error;
                }
            })
        );
    }

    //Actualiza un documento en el servidor y la memoria
    public actualizarDocumento(documento: Documento): Observable<any> {
        let url = '/documentos/actualizarDocumento';
        return this.http.post(url, { documento: documento.toJson() }, this.appMemoriaService.httpOptions).pipe(
            tap((nuevoDocumentoServer: any) => {
                let nuevoDocumento = this.parseObjectDocumento(nuevoDocumentoServer);
                if (nuevoDocumento.id == this.documentosMemoriaService.documentoSeleccionado.id) {
                    this.documentosMemoriaService.documentoSeleccionado = nuevoDocumento;
                    this.registrosService.getRegistros(nuevoDocumento);
                }
                this.documentosMemoriaService.updateDocumento(nuevoDocumento);
            }), catchError((error: HttpErrorResponse) => {
                //TODO: tener cuidado porque si actualizamos el documento seleccionado
                //y luego no podemos actualizarlo en el servidor
                //los datos no son los mismos
                //Solucion: volver a leer los documentos desde el servidor si da error
                let ob = this.getTodosLosDocumentos()
                .subscribe(
                    () => {},
                    (error: Error) => {},
                    () => { ob.unsubscribe(); }
                )
                throw new Error();
            })
        );
    }

    //Crear un nuevo documento desde un json
    private parseObjectDocumento(documento: any): Documento {

        let nuevoDocumento = new Documento(documento._id, documento.nombre, documento.fechaCreacion);
        let nuevosCampos = new Campos();
        nuevosCampos.values = documento.campos.map(campo => {
            let tipoValor = this.documentosMemoriaService.tiposValores.find(tipoValor => {
                if (tipoValor.id == campo.tipoValor) return true;
            });
            return new Campo(campo._id, campo.nombre, tipoValor);
        });

        nuevoDocumento.campos = nuevosCampos;

        return nuevoDocumento;

    }

}