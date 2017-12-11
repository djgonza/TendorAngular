import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Registro } from "app/modules/documentos/models/registro.model";

export class Registros {

    private _values: BehaviorSubject<Registro[]>;
    private _total: BehaviorSubject<number>;
    private _skip: BehaviorSubject<number>;
    private _limit: BehaviorSubject<number>;

    constructor() {
        this._values = new BehaviorSubject<Registro[]>(new Array());
        this._total = new BehaviorSubject<number>(0);
        this._skip = new BehaviorSubject<number>(0);
        this._limit = new BehaviorSubject<number>(20);
    }

    /* Values */
    public set values(registro: Registro[]) {
        this._values.next(registro);
    }

    public get values(): Registro[] {
        return this._values.getValue();
    }

    public get valueObservable(): Observable<Registro[]> {
        return this._values.asObservable();
    }

    /* total */
    public set total(total: number) {
        this._total.next(total);
    }
    
    public get total(): number {
        return this._total.getValue();
    }

    public totalObservable(): Observable<number> {
        return this._total.asObservable();
    }

    /* Skip */
    public set skip(skip: number) {
        this._skip.next(skip);
    }

    public get skip(): number {
        return this._skip.getValue();
    }

    public skipObservable(): Observable<number> {
        return this._skip.asObservable();
    }

    /* Limit */
    public set limit(limit: number) {
        this._limit.next(limit);
    }

    public get limit(): number {
        return this._limit.getValue();
    }

    public limitObservable(): Observable<number> {
        return this._limit.asObservable();
    }
    
    /* To json */
    public toJson(): any {
        let registros = new Array();
        this.values.map(registro => {
            registros.push(registro.toJson());
        });
        return registros;
    }

}