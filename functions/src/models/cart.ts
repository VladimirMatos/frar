import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { CartAttr } from '../interfaces/cart';
import { Inventario } from './inventario';
import { Usuario } from './usuario';


const Cart = db.define<CartAttr>('Cart',{
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	cantidad: DataTypes.DECIMAL(8, 2),
	libras: DataTypes.DECIMAL(8, 2),
	inventario_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
    cliente_id:{
        type: DataTypes.INTEGER,
		allowNull: false
    }
})

Cart.belongsTo(Inventario,{foreignKey:'inventario_id',as:'Inventario'})
Cart.belongsTo(Usuario,{foreignKey:'cliente_id',as:'Cliente'})

export{Cart}