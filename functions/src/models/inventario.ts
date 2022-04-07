import { DataTypes } from "sequelize";
import db from '../config/connectionSequelize';
import { InventarioAttr } from "../interfaces/inventario";
import { Almacenamiento } from "./almacenamiento";
import { Productos } from "./productos";
import { Provedor } from "./provedor";


const Inventario = db.define<InventarioAttr>('Inventario',{
    id:{
        type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
    },
    stock: DataTypes.INTEGER,
    precio_libra: DataTypes.DECIMAL(8, 2),
    producto_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provedor_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    almacenamiento_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: DataTypes.STRING(100)
})


Inventario.belongsTo(Productos,{foreignKey:'producto_id',as:'Productos'})
Inventario.belongsTo(Provedor,{foreignKey:'provedor_id',as:'Provedor'})
Inventario.belongsTo(Almacenamiento,{foreignKey:'almacenamiento_id',as:'Almacenamiento'})

export{Inventario}