import { Rol } from "app/models/rol.models";

export class Usuario {

    private _id: string;
    private _email: string;
    private _nombre: string;
    private _rol: Rol;

    constructor(_id: string, _email: string, _nombre: string, _rol: Rol) {
        this._id = _id;
        this._email = _email;
        this._nombre = _nombre;
        this._rol = _rol;
    }

    /* Id */
    public get id(): string {
        return this._id;
    }

    /* Email */
    public set email(email: string) {
        this._email = email;
    }

    public get email(): string {
        return this._email;
    }

    /* Nombre */
    public set nombre(nombre: string) {
        this._nombre = nombre;
    }

    public get nombre(): string {
        return this._nombre;
    }

    /* Rol */
    public set rol(rol: Rol) {
        this._rol = rol;
    }

    public get rol(): Rol {
        return this._rol;
    }
    
    /* toJson */
    public toJson (): any {
        return {};
    }
}