import { Model } from 'sequelize';

export interface CartAttr extends Model{
    id: number;
    cantidad: number;
    libras: number;
    cliente_id: number;
    inventario_id: number;
}