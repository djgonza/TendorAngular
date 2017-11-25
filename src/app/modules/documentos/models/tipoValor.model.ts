export class TipoValor {

    private _id: string;
    private nombre: string;
    private tipo: string;

    constructor(_id: string, nombre: string, tipo: string) {
        this._id = _id;
        this.nombre = nombre;
        this.tipo = tipo;
    }

    getId(): string {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getTipo(): string {
        return this.tipo;
    }

}