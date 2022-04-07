import { DataTypes } from 'sequelize';
import db from '../config/connectionSequelize';
import { ProductosAttr } from '../interfaces/productos';
import { Categoria } from './categoria';
import { Estados } from './estados';




const Productos = db.define<ProductosAttr>('Producto',{

    id:{
        type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
    },
    nombre: DataTypes.STRING(100),
    categoria_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Productos.belongsTo(Categoria, {foreignKey:'categoria_id' ,as:'Categoria'});
Productos.belongsTo(Estados, {foreignKey:'estado_id' ,as:'Estados'});


export{Productos}