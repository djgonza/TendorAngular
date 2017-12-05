import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpService } from 'app/services/httpService.service';
import { TokenService } from 'app/modules/token/services/token.services';
import { MessagesService } from 'app/services/messages.service';
import { TipoValoresService } from 'app/modules/documentos/services/tipoValores.service';

import { Documento } from 'app/modules/documentos/models/documento.model';
import { Campo } from 'app/modules/documentos/models/campo.model';
import { TipoValor } from 'app/modules/documentos/models/tipoValor.model';

@Injectable()
export class DocumentosService {

    /*private documentos: BehaviorSubject<Documento[]>;
    private documentos$: Observable<Documento[]>;

    private tiposValores: BehaviorSubject<TipoValor[]>;
    private tiposValores$: Observable<TipoValor[]>;

    private selectedDocumento: BehaviorSubject<Documento>
    private selectedDocumento$: Observable<Documento>

    private documentoViewState: BehaviorSubject<number>
    private documentoViewState$: Observable<number>*/

    public documentos = new BehaviorSubject<Documento[]>(new Array());
    public documentos$ = this.documentos.asObservable();

    public selectedDocumento = new BehaviorSubject<Documento>(null);
    public selectedDocumento$ = this.selectedDocumento.asObservable();

    public viewEstado = new BehaviorSubject<number>(1);
    public viewEstado$ = this.selectedDocumento.asObservable();

    private httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', this.tokenService.token.getValue().getCadena())
            .set('Content-Type', 'application/json')
    };

    constructor(
        private http: HttpService,
        private messageService: MessagesService,
        private tokenService: TokenService,
        private tipoValoresService: TipoValoresService
    ) { }

    //Leer todos los documentos del servidor
    public getTodosLosDocumentos(): Observable<any> {

        let url = '/documentos/leerTodosLosDocumentos';
        let llamada = this.http.get(url, this.httpOptions)
        let bs = new BehaviorSubject<Documento[]>(null);
        llamada.subscribe((documentosServer: any) => {

            //Validamos la respuesta desde el servidor
            if (!(documentosServer instanceof Array)) {
                let error = new Error("Respuesta incorrecta desde el servidor");
                throw error;
            }

            //Vaciamos los documentos actuales
            this.clearDocumentos();

            let nuevosDocumentos = new Array<Documento>();

            //Cargamos los nuevos documentos
            documentosServer.map((documentoServer) => {
                //Creamos el documento
                let nuevoDocumento = this.parseObjectDocumento(documentoServer);

                nuevosDocumentos.push(nuevoDocumento);
            });

            this.documentos.next(nuevosDocumentos);
            bs.next(nuevosDocumentos);

        }, (error) => {
            console.log(error);
            bs.error(error);
        });

        return bs;

    }

    //Crea un documento nuevo en el servidor
    public crearDocumento(nombre): Observable<any> {
        let url = '/documentos/crearDocumento';
        let llamada = this.http.post(url, { nombre: nombre }, this.httpOptions);
        let bs = new BehaviorSubject<Documento>(null);
        llamada.subscribe((nuevoDocumentoServer) => {
            //Creamos el documento
            let nuevoDocumento = this.parseObjectDocumento(nuevoDocumentoServer);
            //Añadimos el nuevo Documento a la memoria
            let oldDocumentos = this.documentos.getValue();
            oldDocumentos.push(nuevoDocumento);
            this.documentos.next(oldDocumentos);
            //Seleccionamos el nuevo documento
            this.selectedDocumento.next(nuevoDocumento);
            bs.next(nuevoDocumento);
        }, (error) => {
            console.log(error);
            bs.error(error);
        });
        return bs.asObservable();
    }

    public actualizarDocumento(documento: Documento): Observable<any> {
        let url = '/documentos/actualizarDocumento';
        let llamada = this.http.post(url, { documento: documento.toJson() }, this.httpOptions);
        llamada.subscribe((nuevoDocumentoServer) => {
            let oldDocumento = this.selectedDocumento.getValue();
            let oldDocumentos = this.documentos.getValue();
            let nuevoDocumento = this.parseObjectDocumento(nuevoDocumentoServer);

            oldDocumentos.find((documento, i) => {
                if (documento.getId() == oldDocumento.getId()) {
                    oldDocumentos[i] = nuevoDocumentoServer;
                    return true;
                }
            });
            this.selectedDocumento.next(nuevoDocumento);
            this.documentos.next(oldDocumentos);

        }, (error) => {
            console.log(error);
        });
        return llamada;
    }

    public addCampoVacio() {
        let tipoValor = this.tipoValoresService.tipoValores.getValue()[0];
        let oldDocumento = this.selectedDocumento.getValue();
        let oldCampos = oldDocumento.getCampos();
        oldCampos.push(new Campo(null, "", tipoValor));
        oldDocumento.setCampos(oldCampos);
        this.selectedDocumento.next(oldDocumento);
    }

    public removeCampo(campo: Campo) {
        let oldDocumento = this.selectedDocumento.getValue();
        let oldCampos = oldDocumento.getCampos();
        let index = oldCampos.indexOf(campo);
        oldCampos.splice(index, 1);
        oldDocumento.setCampos(oldCampos);
        this.selectedDocumento.next(oldDocumento);
    }

    public setSelectedDocumento(documento: Documento) {
        this.selectedDocumento.next(documento);
    }

    //Limpia el objecto documentos
    private clearDocumentos(): void {
        this.documentos.next(new Array());
    }

    //Crear un documento desde los datos del servidor
    private parseObjectDocumento(documento: any): Documento {

        let tiposValores = this.tipoValoresService.tipoValores.getValue();

        let campos = new Array<Campo>();
        documento.campos.map(campo => {
            let tipoValores = tiposValores.find(tipoValor => {
                return tipoValor.getId() == campo.tipoValor
            });
            let nuevoCampo = new Campo(campo._id, campo.nombre, tipoValores);
            campos.push(nuevoCampo);
        });
        return new Documento(documento._id, documento.nombre, documento.fechaCreacion, campos);

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