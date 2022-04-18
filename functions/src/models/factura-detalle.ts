import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { FacturaDetalleAttr } from '../interfaces/factura-detalle';
import { Factura } from './factura';
import { Usuario } from './usuario';


const FacturaDetalle = db.define<FacturaDetalleAttr>('FacturaDetalle',{
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
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cantidad: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	libras: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	producto: {
		type: DataTypes.STRING,
		allowNull: false
	},
    factura_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

FacturaDetalle.belongsTo(Usuario,{foreignKey:'cliente_id',as:'Cliente'});
FacturaDetalle.belongsTo(Factura,{foreignKey:'factura_id',as:'Factura'});

export{FacturaDetalle}