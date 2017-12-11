import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErroresService {

    private _errores: BehaviorSubject<Error[]> = new BehaviorSubject<Error[]>(new Array<Error>());
    private interval;

    constructor () {}

    public set error(error: Error) {
        let nuevosErrores = this.errores;
        nuevosErrores.unshift(error);
        this._errores.next(nuevosErrores);
        if (nuevosErrores.length == 1) this.initInterval(); 
    }
    
    public get errores(): Error[] {
        return this._errores.getValue();
    }

    public get erroresObservable(): Observable<Error[]> {
        return this._errores.asObservable();
    }
    
    public resetErrores (): void {
        this._errores.next(new Array<Error>());
    }

    public removeError(error: Error): void {
        if (this.errores.length <= 1) {
            this._errores.next(new Array<Error>());
            return;
        }
        let nuevosErrores = this.errores;
        nuevosErrores.splice(nuevosErrores.indexOf(error), 1);
        this._errores.next(nuevosErrores);
    }

    private initInterval (): void {
        this.interval = setInterval(() => { this.removeLastError() }, 3000);
    }

    private clearInterval (): void {
        clearInterval(this.interval);
    }

    private removeLastError (): void {
        let nuevosErrores = this.errores;
        nuevosErrores.splice(nuevosErrores.length - 1, 1);
        this._errores.next(nuevosErrores);
        if (nuevosErrores.length == 0) this.clearInterval();
    }

}