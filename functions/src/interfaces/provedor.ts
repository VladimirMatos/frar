import { Model } from "sequelize";

export interface ProvedorAttr extends Model{
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
}