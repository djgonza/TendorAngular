import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TokenComponent } from './components/token.component';

import { MessagesService } from './../../services/messages.service';
import { TokenService } from './services/token.services';

@NgModule({
    declarations: [
        TokenComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ MessagesService, TokenService ],
    bootstrap: [ TokenComponent ]
})
export class TokenModule { }
