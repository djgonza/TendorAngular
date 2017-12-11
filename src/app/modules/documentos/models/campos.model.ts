import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Campo } from "app/modules/documentos/models/campo.model";

export class Campos {

    private _values: BehaviorSubject<Campo[]>;

    constructor () {
        this._values = new BehaviorSubject<Campo[]>(new Array());
    }

    public set values(campos: Campo[]) {
        this._values.next(campos);
    }
    
    public get values(): Campo[] {
        return this._values.getValue();
    }
    
    public get valueObservable() : Observable<Campo[]> {
        return this._values.asObservable();
    }
    
    public toJson(): any {
        let campos = new Array();
        this.values.map(campo => {
            campos.push(campo.toJson());
        });
        return campos;
    }

}