import { Model } from 'sequelize';

export interface UserAttr extends Model {
  id: number;
  nombre: string;
  nombre_empresa: string;
  apellido: string;
  descripcion: string;
  fecha_nacimiento: string;
  telefono: string;
  correo: string;
  contrasena: string;
  direccion_detalle: string;
  num_carnet: string;
  num_identificacion: string;
  role_id: number;
  rnc: number;
}
