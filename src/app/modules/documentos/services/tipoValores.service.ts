import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';

/* Services */
import { HttpService } from "app/services/httpService.service";
import { AppMemoriaService } from "app/services/appMemoria.service";
import { DocumentosMemoriaService } from "app/modules/documentos/services/documentosMemoria.service";

/* Models */
import { TipoValor } from "app/modules/documentos/models/tipoValor.model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoValoresService {

    constructor(
        private http: HttpService,
        private appMemoriaService: AppMemoriaService,
        private documentosMemoriaService: DocumentosMemoriaService
    ) {
        
        let bs = this.leerTipoValoresDesdeServer()
            .subscribe(() => {

            }, (error: Error) => {

            }, () => {
                bs.unsubscribe();
            });
            
    }

    //Lee los tipos de valores desde el servidor y los guarda en la memoria
    leerTipoValoresDesdeServer(): Observable<any> {

        let url = '/tipoValores/leerTipoValores';
        return this.http.get(url, this.appMemoriaService.httpOptions).pipe(
            tap((tipoValoresServer: any) => {
                this.documentosMemoriaService.tiposValores =
                    tipoValoresServer.map(tipoValor => {
                        return this.parseObjectTipoValor(tipoValor);
                    });
            }),
            catchError((error: HttpErrorResponse) => {
                throw new Error();
            })
        )

    }

    //Crear un nuevo TipoValor desde un json
    private parseObjectTipoValor(tipoValor: any): TipoValor {
        return new TipoValor(tipoValor._id, tipoValor.nombre, tipoValor.tipo);
    }

}