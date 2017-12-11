import { Campo } from "app/modules/documentos/models/campo.model";

export class Valor {

    private _id: string;
    private _campo: Campo;
    private _valor: any;

    constructor(_id:string, _campo: Campo, _valor: any) {
        this._id = _id;
        this._campo = _campo;
        this._valor = _valor;
    }

    public get id(): string {
        return this._id;
    }
    
    public set campo(campo: Campo) {
        this._campo = campo;
    }

    public get campo(): Campo {
        return this._campo;
    }

    public set valor(valor: any) {
        this._valor = valor;
    }

    public get valor(): any {
        return this._valor;
    }
    
    public toJson (): any {
        let jsonReturn = {
            "campo": this.campo.id,
            "valor": this.valor
        }
        if (this._id) jsonReturn["_id"] = this._id;
        return jsonReturn;
    }

}