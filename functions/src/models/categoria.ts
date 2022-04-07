import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { CategoriaAttr } from '../interfaces/categoria';

const Categoria = db.define<CategoriaAttr>('Categorias', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	nombre: {
		type: DataTypes.STRING(45),
		allowNull: false,
		unique: true
	}
}, { tableName: 'Categoria', timestamps: false });

export { Categoria }