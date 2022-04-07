import { Model } from 'sequelize';

export interface AlmacenamientoAttr extends Model {
	id: number;
	nombre: string;
}
