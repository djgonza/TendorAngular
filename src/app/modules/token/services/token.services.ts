import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { Token } from './../models/token.model';
import { MessagesService } from './../../../services/messages.service';

@Injectable()
export class TokenService {

    private serviceUrl = 'http://localhost:3000/';  // URL to web api
    public token: Token;

    constructor(
        private http: HttpClient,
        private messageService: MessagesService) { }

    //Comprobamos si el token existe
    ngOnInit () {
        this.token = new Token();
        this.token.setToken(localStorage.getItem('token'));
    }    

    //Leemos el token del servidor
    getToken(email: String, secret: String): Observable<Token> {
        return this.http.post<Token>(
            `${this.serviceUrl}usuarios/generartoken`,
            { email: email, secret: secret },
            httpOptions)
            .pipe(
            tap((token: Token) => {
                this.token = token;
            }),
            catchError(this.handleError<Token>('Token Error'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            
            //Datos erroneos
            if (error.status){
                this.log(`¡Los campos son incorrectos!`);
            }

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }
}


