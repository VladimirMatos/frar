import { Model } from 'sequelize';

export interface EstadosAttr extends Model {
	id: number;
	nombre: string;
}
