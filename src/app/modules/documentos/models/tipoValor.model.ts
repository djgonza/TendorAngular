export class TipoValor {

    private _id: string;
    private _nombre: string;
    private _tipo: string;

    constructor(_id: string, _nombre: string, _tipo: string) {
        this._id = _id;
        this._nombre = _nombre;
        this._tipo = _tipo;
    }

    public get id(): string {
        return this._id;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get tipo(): string {
        return this._tipo;
    }

}