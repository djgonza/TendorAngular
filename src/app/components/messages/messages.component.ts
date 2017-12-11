import { Component } from '@angular/core';

/* Services */
import { MessagesService } from "app/services/messages.service";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

    constructor(
        public messagesService: MessagesService
    ) { }

    public removeMessage(message: string): void {
        this.messagesService.removeMessage(message);
    }

}