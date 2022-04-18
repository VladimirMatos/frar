import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { FacturaAttr } from '../interfaces/factura';



const Factura = db.define<FacturaAttr>('Factura',{
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
    condiciones: DataTypes.STRING,
    total:{
        type: DataTypes.DECIMAL(8, 2),
		allowNull: false
    }
})


export{Factura}