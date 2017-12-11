import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Campos } from "app/modules/documentos/models/campos.model";
import { Registros } from "app/modules/documentos/models/registros.model";

export class Documento {

    private _id: string;
    private _nombre: string;
    private _fechaCreacion: Date;
    private _campos: BehaviorSubject<Campos>;
    private _registros: BehaviorSubject<Registros>;

    constructor(_id: string, _nombre: string, _fechaCreacion: Date) {
        this._id = _id;
        this._nombre = _nombre;
        this._fechaCreacion = _fechaCreacion;
        this._campos = new BehaviorSubject<Campos>(new Campos());
        this._registros = new BehaviorSubject<Registros>(new Registros());
    }

    public get id(): string {
        return this._id;
    }

    public set nombre(nombre: string) {
        this._nombre = nombre;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public set fechaCreacion(fechaCreacion: Date) {
        this._fechaCreacion = fechaCreacion;
    }

    public get fechaCreacion(): Date {
        return this._fechaCreacion;
    }

    public set campos(campos: Campos) {
        this._campos.next(campos);
    }

    public get campos(): Campos {
        return this._campos.getValue();
    }

    public get camposObservable(): Observable<Campos> {
        return this._campos.asObservable();
    }

    public set registros(registros: Registros) {
        this._registros.next(registros);
    }

    public get registros(): Registros {
        return this._registros.getValue();
    }

    public get registrosObservable(): Observable<Registros> {
        return this._registros.asObservable();
    }

    public toJson(): any {
        return {
            "_id": this.id,
            "nombre": this.nombre,
            "fechaCreacion": this.fechaCreacion,
            "campos": this.campos.toJson(),
            "registros": this.registros.toJson()
        }
    }

}