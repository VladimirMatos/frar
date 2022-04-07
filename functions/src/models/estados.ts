import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { EstadosAttr } from '../interfaces/estados';

const Estados = db.define<EstadosAttr>('Estados', {
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
}, { tableName: 'Estados', timestamps: false });

export { Estados }