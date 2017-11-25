import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Campo } from './../../models/campo.model';

@Component({
    selector: 'lista-campos',
    templateUrl: './listaCampos.component.html',
    styleUrls: ['./listaCampos.component.css']
})
export class ListaCampos {

    @Input() campos: Campo[] = null;

    constructor() { }

}