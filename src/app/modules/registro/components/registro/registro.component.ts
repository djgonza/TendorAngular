import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { RegistroService } from "app/modules/registro/services/registro.service";
import { MessagesService } from "app/services/messages.service";

/* Models */
import { Usuario } from "app/models/usuario.model";

@Component({
    selector: 'registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

    @Input() email: string;
    @Input() secret: string;

    constructor(
        private router: Router,
        private registroService: RegistroService,
        private messagesService: MessagesService
    ) { }

    public volver (): void {
        this.router.navigate(['/']);
    }

    public registrar(): void {
        let sb = this.registroService.registrarUsuario(this.email, this.secret)
        .subscribe(() => {
            this.messagesService.message = "Registrado con exito";
            this.router.navigate(['']);
        }, (error: Error) => {
        }, () => {
            sb.unsubscribe();
        });
    }

}