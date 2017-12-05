import { Campo } from './campo.model';

export class Valor {

    private campo: Campo;
    private valor: any;

    constructor(campo: Campo, valor: any) {
        this.campo = campo;
        this.valor = valor;
    }

    setValor(valor: any): void {
        this.valor = valor;
    }

    getValor(): any {
        return this.valor;
    }

    getCampo(): Campo {
        return this.campo;
    }

}