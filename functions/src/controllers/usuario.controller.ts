import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../models/usuario";

const getUsuarios = async (req: Request, res: Response) => {
  try {
    const user = await Usuario.findAll({
      order: [["updated_at", "DESC"]],
    });
    if (!user.length) {
      return res.status(204).send({
        mensaje: "No hay usuario",
        message: "There are not users",
      });
    }
   return res.status(200).send({
      mensaje: "Retorna los usuarios",
      message: "Returns the users",
      user,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const createUsuarios = async (req: Request, res: Response) => {
  try {
    const code = new Date().getTime();
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      email,
      contraseña,
      direccion_detalle,
      num_identificacion,
    } = req.body;
    const passwordHash = await bcrypt.hash(contraseña, 8);
    const params = {
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      email,
      contraseña: passwordHash,
      direccion_detalle,
      num_carnet: code,
      num_identificacion,
      role_id: 1,
    };

    const user = await Usuario.create(params);

    if (!user) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Usuario creado",
      user,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const updateUsuarios = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
    } = req.body;

    const params = {
      nombre,
      apellido,
      fecha_nacimiento,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
    };

    const user = await Usuario.update(params, { where: { id } });

    if (!user.length) {
      return res.status(204).send();
    }

   return res.status(200).send({
      message: "Usuario actualizado",
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const getUsuariosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await Usuario.findOne({ where: { id } });

    if (!users) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Usuario obtenido",
      users,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await Usuario.destroy({ where: { id } });

    if (!users) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Usuario eliminado",
      users,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const getCliente = async (req: Request, res: Response) => {
  try {
    const user = await Usuario.findAll({
      where: { role_id: 2 },
      order: [["updated_at", "DESC"]],
    });
    if (!user.length) {
      return res.status(204).send({
        mensaje: "No hay cliente",
      });
    }
   return res.status(200).send({
      mensaje: "Retorna los cliente",
      user,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const createClientes = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      nombre_empresa,
      descripcion,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
    } = req.body;
    const params = {
      nombre,
      apellido,
      nombre_empresa,
      descripcion,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
      role_id: 2,
    };

    const user = await Usuario.create(params);

    if (!user) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Cliente creado",
      user,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const updateCliente = async (req: Request, res: Response) => {
  try {
    const {
      id,
      nombre,
      apellido,
      nombre_empresa,
      descripcion,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
    } = req.body;

    const params = {
      nombre,
      apellido,
      nombre_empresa,
      descripcion,
      telefono,
      email,
      direccion_detalle,
      num_identificacion,
    };

    const user = await Usuario.update(params, { where: { id } });

    if (!user.length) {
      return res.status(204).send();
    }

   return res.status(200).send({
      message: "Cliente actualizado",
      user,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await Usuario.destroy({ where: { id } });

    if (!users) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Cliente eliminado",
      users,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const getClientesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await Usuario.findOne({ where: { id } });

    if (!users) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Usuario obtenido",
      users,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};

export {
  getUsuarios,
  createUsuarios,
  updateUsuarios,
  getUsuariosById,
  deleteUsuario,
  getCliente,
  createClientes,
  updateCliente,
  deleteCliente,
  getClientesById,
};
