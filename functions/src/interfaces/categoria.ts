import { Model } from 'sequelize';

export interface CategoriaAttr extends Model {
	id: number;
    nombre:string;
}
