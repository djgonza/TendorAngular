import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/* Models */
import { Token } from "app/models/token.model";
import { Usuario } from "app/models/usuario.model";

@Injectable()
export class AppMemoriaService {
    
    private _token: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
    private _httpOptions: BehaviorSubject<any> = new BehaviorSubject<any>({});
    private _usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null); //TODO: Añadir metodos

    constructor () {
        if (localStorage.getItem("token")) {
            this.token = new Token(localStorage.getItem("token"));
        }
        this._httpOptions.next({
            headers: new HttpHeaders()
                .set('Authorization', this.token ? this.token.cadena : null) //TODO: Revisar y mejorar
                .set('Content-Type', 'application/json')
        });
    }

    /* Token */
    public set token(token: Token) {
        this._token.next(token);
        localStorage.setItem("token", token.cadena);
        this._httpOptions.next({
            headers: new HttpHeaders()
                .set('Authorization', token.cadena ) //TODO: Revisar y mejorar
                .set('Content-Type', 'application/json')
        });
    }

    public get token(): Token {
        return this._token.getValue();
    }

    public get tokenObservable(): Observable<Token> {
        return this._token.asObservable();
    }

    /* Http Options */
    public set httpOptions(httpHeaders) {
        this._token.next(httpHeaders);
    }

    public get httpOptions() {
        return this._httpOptions.getValue();
    }

    public get httpOptionsObservable(): Observable<any> {
        return this._httpOptions.asObservable();
    }

}