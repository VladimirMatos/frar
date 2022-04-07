import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { FacturaAttr } from '../interfaces/factura';
import { Usuario } from './usuario';


const Factura = db.define<FacturaAttr>('Factura',{
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	cliente_id:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	precio_libras:{
		type: DataTypes.JSON,
		allowNull: false
	},
	cantidad: {
		type: DataTypes.JSON,
		allowNull: false
	},
	libras: {
		type: DataTypes.JSON,
		allowNull: false
	},
	producto: {
		type: DataTypes.JSON,
		allowNull: false
	},
    condiciones: DataTypes.STRING,
    total:{
        type: DataTypes.DECIMAL(8, 2),
		allowNull: false
    }
})

Factura.belongsTo(Usuario,{foreignKey:'cliente_id',as:'Cliente'})

export{Factura}