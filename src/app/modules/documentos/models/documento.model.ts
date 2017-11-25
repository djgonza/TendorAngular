import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Campo } from './campo.model';

export class Documento {

    private _id: string;
    private nombre: string;
    private fechaCreacion: Date;
    private campos: BehaviorSubject<Campo[]>;

    constructor(_id: string, nombre: string, campos?: Campo[]) {
        this._id = _id;
        this.nombre = nombre;
        this.campos = new BehaviorSubject(campos || new Array());
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setCampos (campos: Campo[]): void {
        this.campos.next(campos);
    }

    getId(): string {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getBehaviorSubjectCampos(): BehaviorSubject<Campo[]> {
        return this.campos;
    }

    getArrayCampos(): Campo[] {
        return this.campos.getValue();
    }

    getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

}