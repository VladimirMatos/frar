import { Request, Response } from "express";
import { Provedor } from "../models/provedor";

const getProvedor = async (req: Request, res: Response) => {
  try {
    const provedor = await Provedor.findAll({
      order: [["updatedAt", "DESC"]],
    });

    if (!provedor.length) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Provedores obtenidos",
      provedor,
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
const getProvedorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const provedor = await Provedor.findOne({ where: { id } });

    if (!provedor) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Provedor obtenido",
      provedor,
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
const createProvedor = async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, telefono } = req.body;

    const params = {
      nombre,
      direccion,
      telefono,
    };

    const provedor = await Provedor.create(params);

    if (!provedor) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Provedor creado",
      provedor,
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
const updateProvedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;

    const params = {
      nombre,
      direccion,
      telefono,
    };

    const provedor = await Provedor.update(params, { where: { id } });

    if (!provedor.length) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Provedor actualizado",
      provedor,
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
const deleteProvedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const provedor = await Provedor.destroy({ where: { id } });

    if (!provedor) {
      return res.status(204).send();
    }

   return res.status(200).send({
      mensaje: "Provedor eliminado",
      provedor,
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
  getProvedor,
  getProvedorById,
  createProvedor,
  updateProvedor,
  deleteProvedor,
};
