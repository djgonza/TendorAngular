import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class HttpService {

    private serviceUrl = 'http://localhost:3000';  // URL to web api

    constructor(
        private http: HttpClient) { }

    //Peticiones get
    public get(url: string, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.get(urlToServer, httpOptions);
    }

    //Peticiones post
    public post(url: string, body: Object, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.post(urlToServer, body, httpOptions);
    }

    //Peticiones put
    public put(url: string, body: Object, httpOptions?: any): Observable<any> {
        let urlToServer = this.serviceUrl + url;
        return this.http.post(urlToServer, body, httpOptions);
    }

    //Peticiones delete
    public delete(url: string, body: Object, httpOptions?: any): Observable<any> {
        var self = this;
        let urlToServer = this.serviceUrl + url;
        return this.http.post(urlToServer, body, httpOptions);
    }
}