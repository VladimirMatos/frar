import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario';
import { Role } from '../models/role';
import { Categoria } from '../models/categoria';
import { Estados } from '../models/estados';
import { Almacenamiento } from '../models/almacenamiento';
import { Provedor } from '../models/provedor';
import { Productos } from '../models/productos';


const inicializar = async (req: Request, res: Response) =>{

  try {
    await Role.create({nombre:'Empleado'})
    await Role.create({nombre:'Cliente'})
    await Role.create({nombre:'Admin'})
    await Categoria.create({nombre:'Cerdo'})
    await Categoria.create({nombre:'Pollo'})
    await Estados.create({nombre:'Disponible'})
    await Estados.create({nombre:'Fuera de Stock'})
    await Almacenamiento.create({nombre:'A1'})
    await Productos.create({nombre:'Cerdo',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Pierna',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Chuleta Fresca',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Chuleta Ahumada',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Costillita Ahumada',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Pollo Ahumado',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Masita Ahumada',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Longaniza',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Lomo',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Paletas',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Cuello',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Costillitas',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Cabeza',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Papada',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Patica',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Barrigada',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Capa',categoria_id:1,estado_id:1})
    await Productos.create({nombre:'Otros',categoria_id:1,estado_id:1})
     const params = {
       nombre:"Administrador test 4",
       telefono:"804-004-0004",
       direccion_detalle:"Test direccion 4"
     };

     const user = await Provedor.create(params);

   if (!user) {
     return res.status(204).send();
   }
   
   res.status(200).send({
       mesanje:'Todo creado'
   })

  } catch (error) {
    res.status(400).send({
        mensaje: "Ha ocurrido un error",
        messaje: "It has ocurred an error",
        error,
      });
  
      throw error;
  }

}

export {inicializar}