import { DataTypes } from 'sequelize';

import db from '../config/connectionSequelize';
import { UserAttr } from '../interfaces/usuario';
import { Role } from './role';

const Usuario = db.define<UserAttr>(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING(100),
    nombre_empresa: DataTypes.STRING(100),
    descripcion: DataTypes.STRING(200),
    apellido: DataTypes.STRING(100),
    fecha_nacimiento: DataTypes.STRING(100),
    telefono: DataTypes.STRING(100),
    contraseña: DataTypes.STRING(100),
    direccion_detalle: DataTypes.STRING(100),
    num_carnet: DataTypes.STRING(100),
    num_identificacion: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(45),
      validate: {
        isEmail: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { createdAt: 'created_at', updatedAt: 'updated_at' }
);

Usuario.belongsTo(Role, { foreignKey: 'role_id', as: 'Role' });

export { Usuario };