export class Documento {

    private _id: string;
    private nombre: string;

    constructor (_id: string, nombre: string) {
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

}