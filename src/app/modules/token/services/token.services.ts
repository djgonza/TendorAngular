import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { Token } from './../models/token.model';
import { MessagesService } from './../../../services/messages.service';
import { HttpService } from './../../../services/httpService.service';

@Injectable()
export class TokenService {

    private url = '/token/';
    public token = new BehaviorSubject<Token>(null);
    public token$ = this.token.asObservable();

    constructor(
        private http: HttpClient,
        private messageService: MessagesService,
        private httpService: HttpService) {
        this.getTokenDesdeMemoria();
    }

    //Leemos el token desde la memoria
    getTokenDesdeMemoria(): void {
        if (localStorage.getItem('token')) {
            let tokenMemoria = new Token(localStorage.getItem('token'));
            this.token.next(tokenMemoria);
        }
    }

    //Leemos el token del servidor
    getTokenDesdeElServidor(email: String, secret: String): void {

        let serviceUrl = '/usuarios/generarToken';
        let body = {
            email: email,
            secret: secret
        }

        this.httpService.post(serviceUrl, body)
            .subscribe((token: any) => {
                localStorage.setItem('token', token.cadena);
                this.token.next(new Token(token.cadena));
            });

    }

    //Logguer
    private log(message: string) {
        this.messageService.add(message);
    }
}


