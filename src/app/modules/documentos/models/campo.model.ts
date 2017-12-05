import { TipoValor } from './tipoValor.model';

export class Campo {

    private _id: string;
    private nombre: string;
    private tipoValor: TipoValor;

    constructor(_id: string, nombre: string, tipoValor: TipoValor) {
        this._id = _id;
        this.nombre = nombre;
        this.tipoValor = tipoValor;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getNombre(): string {
        return this.nombre;
    }

    getTipoValor(): TipoValor {
        return this.tipoValor;
    }

    getId (): string {
        return this._id;
    }

    toJson () {
        let jsonReturn = {
            nombre: this.nombre,
            tipoValor: this.tipoValor
        }
        if (this._id) jsonReturn["_id"] = this._id; 
        return jsonReturn;
    }

}