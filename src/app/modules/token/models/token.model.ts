export class Token {
    
    private cadena: string

    Token(cadena: string) {
        this.cadena = cadena;
    }

    setCadena(cadena: string): void {
        this.cadena = cadena;
    }

    getCadena (): string {
        return this.cadena;
    }

}