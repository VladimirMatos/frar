import { Model } from 'sequelize';

export interface FacturaAttr extends Model{
    id: number;
    condiciones: string;
    total: number;
}