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

    const user = await Usuario.findOne({ where: { id } });

    if (!user) {
      return res.status(204).send();
    }

    await user.update(req.body);

    return res.status(200).send({
      message: "Usuario actualizado",
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

    const users = await Usuario.findOne({ where: { id } });

    if (!users) {
      return res.status(204).send();
    }

    await users.destroy();
    
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


export {
  getUsuarios,
  createUsuarios,
  updateUsuarios,
  getUsuariosById,
  deleteUsuario
};
