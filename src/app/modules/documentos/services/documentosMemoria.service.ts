import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { TipoValor } from "app/modules/documentos/models/tipoValor.model";

@Injectable()
export class DocumentosMemoriaService {

    private _documentos: BehaviorSubject<Documento[]> = new BehaviorSubject<Documento[]>(new Array<Documento>());
    private _tiposValores: BehaviorSubject<TipoValor[]> = new BehaviorSubject<TipoValor[]>(new Array<TipoValor>());
    private _documentoSeleccionado: BehaviorSubject<Documento> = new BehaviorSubject<Documento>(null);
    private _documentoViewState: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    constructor (
        private httpService: HttpService,
        private appMemoriaService: AppMemoriaService
    ) {}

    /* Documentos */
    public set documentos(documentos: Documento[]) {
        this._documentos.next(documentos);
    }

    public get documentos(): Documento[] {
        return this._documentos.getValue();
    }
    
    public get documentosObservable(): Observable<Documento[]> {
        return this._documentos.asObservable();
    }

    public addDocumento (documento: Documento) {
        let nuevosDocumentos = this.documentos;
        nuevosDocumentos.unshift(documento);
        this.documentos = nuevosDocumentos;
    }

    public updateDocumento (nuevoDocumento: Documento) {
        let nuevosDocumentos = this.documentos.map(documento => {
            if (documento.id == nuevoDocumento.id) {
                return nuevoDocumento;
            }
            return documento;
        });
    }

    /* Tipos Valores */
    public set tiposValores(tiposValores: TipoValor[]) {
        this._tiposValores.next(tiposValores);
    }

    public get tiposValores(): TipoValor[] {
        return this._tiposValores.getValue();
    }

    public get tiposValoresObservable(): Observable<TipoValor[]> {
        return this._tiposValores.asObservable();
    }

    /* Documento Seleccionado */
    public set documentoSeleccionado(documento: Documento) {
        this._documentoSeleccionado.next(documento);
    }

    public get documentoSeleccionado(): Documento {
        return this._documentoSeleccionado.getValue();
    }

    public get documentoSeleccionadoObservable(): Observable<Documento> {
        return this._documentoSeleccionado.asObservable();
    }

    /* Documento View State */
    public set documentoViewState(valor: number) {
        this._documentoViewState.next(valor);
    }

    public get documentoViewState(): number {
        return this._documentoViewState.getValue();
    }

    public get documentoViewStateObservable(): Observable<number> {
        return this._documentoViewState.asObservable();
    }

}