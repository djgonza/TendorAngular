import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { LoginComponent } from "app/modules/login/components/login/login.component";
import { RegistroComponent } from "app/modules/registro/components/registro/registro.component";
import { DocumentosComponent } from "app/modules/documentos/components/documentos/documentos.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'documentos', component: DocumentosComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }