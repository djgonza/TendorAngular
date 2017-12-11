import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";
import { DocumentosService } from "app/modules/documentos/services/documentos.service";

/* Models */
import { Documento } from "app/modules/documentos/models/documento.model";
import { Campos } from "app/modules/documentos/models/campos.model";
import { Campo } from "app/modules/documentos/models/campo.model";
import { TipoValor } from "app/modules/documentos/models/tipoValor.model";


@Injectable()
export class CamposService {

    constructor(
        private http: HttpService,
        private appMemoriaService: AppMemoriaService,
        private documentosMemoriaService: DocumentosMemoriaService,
        private documentosService: DocumentosService
    ) {}

    public addCampoVacio (documento: Documento) {
        let nuevosCampos = documento.campos.values;
        let nuevoCampo = new Campo(null, "", this.documentosMemoriaService.tiposValores[0]);
        nuevosCampos.push(nuevoCampo);
        documento.campos.values = nuevosCampos;
        this.documentosService.actualizarDocumento(documento);
    }

    //Crear un nuevo TipoValor desde un json
    private parseObjectTipoValor(tipoValor: any): TipoValor {
        return new TipoValor(tipoValor._id, tipoValor.nombre, tipoValor.tipo);
    }

}