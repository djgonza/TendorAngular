import { TipoValor } from './tipoValor.model';

export class Campo {

    private _id: string;
    private _nombre: string;
    private _tipoValor: TipoValor;

    constructor(_id: string, _nombre: string, _tipoValor: TipoValor) {
        this._id = _id;
        this._nombre = _nombre;
        this._tipoValor = _tipoValor;
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

    public set tipoValor(tipoValor: TipoValor) {
        this._tipoValor = tipoValor;
    }

    public get tipoValor(): TipoValor {
        return this._tipoValor;
    }

    public toJson () {
        let jsonReturn = {
            "nombre": this.nombre,
            "tipoValor": this.tipoValor.id
        }
        if (this._id) jsonReturn["_id"] = this._id; 
        return jsonReturn;
    }

}