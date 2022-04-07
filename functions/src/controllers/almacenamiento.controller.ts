import { Request, Response } from "express";
import { Almacenamiento } from "../models/almacenamiento";

const getAlmacenamiento = async (req: Request, res: Response) => {
  try {
    const almacenamiento = await Almacenamiento.findAll({
      order: [["updated_at", "DESC"]],
    });

    if (!almacenamiento.length) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Almacenamientos",
      almacenamiento,
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
const createAlmacenamiento = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    const almacenamiento = await Almacenamiento.create({ nombre });

    if (!almacenamiento) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Almacenamiento creado",
      almacenamiento,
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
const getAlmacenamientoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const almacenamiento = await Almacenamiento.findOne({ where: { id } });

    if (!almacenamiento) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Almacenamiento",
      almacenamiento,
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
const updateAlmacenamiento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const almacenamiento = await Almacenamiento.update(
      { nombre },
      { where: { id } }
    );

    if (!almacenamiento.length) {
      return res.status(204).send();
    }
    res.status(200).send({
      mensaje: "Almacenamiento actualizado",
      almacenamiento,
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
const deleteAlmacenamiento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const almacenamiento = await Almacenamiento.destroy({ where: { id } });

    if (!almacenamiento) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Almacenamiento eliminado",
      almacenamiento,
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
  getAlmacenamiento,
  createAlmacenamiento,
  getAlmacenamientoById,
  updateAlmacenamiento,
  deleteAlmacenamiento,
};
