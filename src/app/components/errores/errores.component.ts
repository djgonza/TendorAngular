import { Component } from '@angular/core';

/* Services */
import { ErroresService } from "app/services/errores.service";

@Component({
    selector: 'errores',
    templateUrl: './errores.component.html',
    styleUrls: ['./errores.component.css']
})
export class ErroresComponent {

    constructor (
        public erroresService: ErroresService
    ) {}

    public removeError (error: Error): void {
        this.erroresService.removeError(error);
    }

}