export class Token {

    private _cadena: string

    constructor(cadena: string) {
        this._cadena = cadena;
    }

    public set cadena(cadena: string) {
        this._cadena = cadena;
    }

    public get cadena(): string {
        return this._cadena;
    }
    
}