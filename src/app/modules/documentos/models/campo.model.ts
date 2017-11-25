import { TipoValor } from './tipoValor.model';

export class Campo {

    private _id: string;
    private nombre: string;
    private tipoValor: TipoValor;
    private fechaCreacion: Date;

    constructor(_id: string, nombre: string, tipoValor: TipoValor) {
        this._id = _id;
        this.nombre = nombre;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getId(): string {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getTipoValor(): TipoValor {
        return this.tipoValor;
    }

    getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

}