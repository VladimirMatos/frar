import { Model } from 'sequelize';

export interface FacturaAttr extends Model{
    id: number;
    libras: number[];
    precio_libras: number[];
    cantidad: number[];
    producto: string[];
    total: number;
}