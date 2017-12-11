import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Valor } from "app/modules/documentos/models/valor.model";

export class Valores {

    private _values: BehaviorSubject<Valor[]>;

    constructor() {
        this._values = new BehaviorSubject<Valor[]>(new Array());
    }

    public set values(valores: Valor[]) {
        this._values.next(valores);
    }

    public get values(): Valor[] {
        return this._values.getValue();
    }

    public get valueObservable(): Observable<Valor[]> {
        return this._values.asObservable();
    }

    public toJson(): any {
        let valores = new Array();
        this.values.map(valor => {
            valores.push(valor.toJson());
        });
        return valores;
    }

}