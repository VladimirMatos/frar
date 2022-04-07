import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { AlmacenamientoAttr } from '../interfaces/almacenamiento';


const Almacenamiento = db.define<AlmacenamientoAttr>('Almacenamiento', {
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
}, { tableName: 'Almacenamiento', timestamps: false });

export { Almacenamiento }