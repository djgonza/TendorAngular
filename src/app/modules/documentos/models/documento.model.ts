import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Campo } from './campo.model';
import { Observable } from 'rxjs/Observable';

export class Documento {

    private _id: string;
    private nombre: string;
    private fechaCreacion: Date;
    private campos: Campo[];
    private cantidadRegistros: BehaviorSubject<number>;

    constructor(_id: string, nombre: string, fechaCreacion: Date, campos: Campo[]) {
        this._id = _id;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.campos = campos || new Array();
        this.cantidadRegistros = new BehaviorSubject<number>(0);
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setCampos(campos: Campo[]): void {
        this.campos = campos;
    }

    setCantidadRegistros(cantidadRegistros: number) {
        this.cantidadRegistros.next(cantidadRegistros);
    }

    getId(): string {
        return this._id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getCampos(): Campo[] {
        return this.campos;
    }

    getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

    getCantidadRegistros(): number {
        return this.cantidadRegistros.getValue();
    }

    getCantidadRegistrosAsObservable (): Observable<number>{
        return this.cantidadRegistros.asObservable();
    }

    toJson() {
        let documento = {
            _id: this._id,
            nombre: this.nombre,
            fechaCreacion: this.fechaCreacion,
            campos: new Array()
        }
        this.campos.map(campo => {
            documento.campos.push(campo.toJson());
        });
        return documento;
    }

}