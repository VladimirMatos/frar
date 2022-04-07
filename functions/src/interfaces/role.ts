import { Model } from 'sequelize';

export interface RoleAttr extends Model {
	id: number;
	nombre: string;
}
