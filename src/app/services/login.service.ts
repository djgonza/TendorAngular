import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { MessagesService } from './messages.service';
import { Token } from './../models/token.model';

@Injectable()
export class LoginService {

    private serviceUrl = 'http://localhost:3000/';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessagesService) { }

    getToken(email: String, secret: String): Observable<Token> {
        return this.http.post<Token>(
            `${this.serviceUrl}usuarios/generartoken`,
            { email: email, secret: secret },
            httpOptions)
            .pipe(
            tap((token: Token) => {
                this.log(`Token leido: ${token}`)
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

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }
}