import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessagesService {

    private _messages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(new Array<string>());
    private interval;

    constructor() { }

    public set message(message: string) {
        let nuevosMessages = this.messages;
        nuevosMessages.unshift(message)
        this._messages.next(nuevosMessages);
        if (nuevosMessages.length == 1) this.initInterval();
    }

    public get messages(): string[] {
        return this._messages.getValue();
    }

    public get messagesObservable(): Observable<string[]> {
        return this._messages.asObservable();
    }

    public resetMessages(): void {
        this._messages.next(new Array<string>());
    }

    public removeMessage (message: string): void {
        if (this.messages.length <= 1)  {
            this._messages.next(new Array<string>());
            return;
        }
        let nuevosMessages = this.messages;
        nuevosMessages.splice(nuevosMessages.indexOf(message), 1);
        this._messages.next(nuevosMessages);
    }

    private initInterval(): void {
        this.interval = setInterval(() => {this.removeLastMessage() }, 3000);
    }

    private clearInterval(): void {
        clearInterval(this.interval);
    }

    private removeLastMessage(): void {
        let nuevosMessages = this.messages;
        nuevosMessages.splice(nuevosMessages.length - 1, 1);
        this._messages.next(nuevosMessages);
        if (nuevosMessages.length == 0) this.clearInterval();
    }

}