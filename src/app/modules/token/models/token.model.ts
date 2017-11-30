export class Token {
    
    private cadena: string

    constructor(cadena: string) {
        this.cadena = cadena;
    }

    setCadena(cadena: string): void {
        this.cadena = cadena;
    }

    getCadena (): string {
        return this.cadena;
    }

}