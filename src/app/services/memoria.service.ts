import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Token } from "app/models/token.model";
import { Documento } from "app/modules/documentos/models/documento.model";
import { TipoValor } from "app/modules/documentos/models/tipoValor.model";

@Injectable()
export class MemoriaService {
    
    private tokenBS: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
    private token$: Observable<Token>;

    constructor () {}

    public get token(): Token {
        return this.tokenBS.getValue();
    }

    public set token(token: Token) {
        this.tokenBS.next(token);
    }

}