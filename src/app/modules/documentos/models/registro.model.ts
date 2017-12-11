import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Documento } from "app/modules/documentos/models/documento.model";
import { Valores } from "app/modules/documentos/models/valores.model";

export class Registro {

    private _id: string;
    private _documento: Documento; //revisar is hace falta
    private _fechaCreacion: Date;
    private _valores: BehaviorSubject<Valores>;

    constructor(_id: string, _documento: Documento, _fechaCreacion?: Date) {
        this._id = _id;
        this._documento = _documento;
        this._fechaCreacion = _fechaCreacion || null;
        this._valores = new BehaviorSubject<Valores>(null);
    }

    
    public get id(): string {
        return this._id;
    }

    public get documento(): Documento {
        return this._documento;
    }
    
    public get fechaCreacion(): Date {
        return this._fechaCreacion;
    }

    public set valores(valores: Valores) {
        this._valores.next(valores);
    }

    public get valores(): Valores {
        return this._valores.getValue();
    }

    public get valoresOnservable(): Observable<Valores> {
        return this._valores.asObservable();
    }
    
    public toJson (): any {
        let jsonReturn = {
            "documento": this.documento.id,
            "valores": this.valores.toJson()
        }
        if (this._id) jsonReturn["_id"] = this._id;
        if (this.fechaCreacion) jsonReturn["fechaCreacion"] = this.fechaCreacion;
        return jsonReturn;
    }
    

}