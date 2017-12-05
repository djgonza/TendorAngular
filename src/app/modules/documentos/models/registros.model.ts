import { Campo } from './campo.model';
import { Documento } from './documento.model';
import { Valor } from './valor.model';

export class Registro {

    private _id: string;
    private documento: Documento;
    private fechaCreacion: Date;
    private campos: Valor[];

    constructor(_id: string, documento: Documento, fechaCreacion: Date, campos: Valor[]) {
        this._id = _id;
        this.documento = documento;
        this.fechaCreacion = fechaCreacion;
        this.campos = campos || new Array<Valor>();
    }

    setCampos(campos: Valor[]): void {
        this.campos = campos;
    }

    getId(): string {
        return this._id;
    }

    getDocumento() :Documento {
        return this.documento;
    }

    getCampos(): Valor[] {
        return this.campos;
    }

    getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

    toJson () {
        
    }

}