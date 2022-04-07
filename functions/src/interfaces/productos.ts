import { Model } from 'sequelize';

export interface ProductosAttr extends Model {
	id: number;
	nombre: string;
    categoria_id: number;
    estado_id: number
}