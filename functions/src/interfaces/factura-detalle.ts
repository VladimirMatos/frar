import { Model } from 'sequelize';

export interface FacturaDetalleAttr extends Model{
    id: number;
    libras: number;
    precio_libras: number;
    cantidad: number;
    producto: string; 
    factura_id: number;
    tax: number;
}