export class Rol {

    private _id: string;
    private _nombre: string;

    constructor(_id: string, _nombre: string) {
        this._id = _id;
        this._nombre = _nombre;
    }

    public get id() :string {
        return this._id;
    }

    public get nombre() :string {
        return this._nombre;
    }

}