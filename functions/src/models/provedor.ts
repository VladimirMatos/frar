import { DataTypes } from "sequelize";
import db from '../config/connectionSequelize';
import { ProvedorAttr } from "../interfaces/provedor";



const Provedor = db.define<ProvedorAttr>('Provedor',{
    id:{
        type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
    },
    nombre: DataTypes.STRING(100),
    direccion: DataTypes.STRING(100),
    telefono: DataTypes.STRING(100)
})


export{Provedor}

