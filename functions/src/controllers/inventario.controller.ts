import { Request, Response } from "express";
import { Almacenamiento } from "../models/almacenamiento";
import { Categoria } from "../models/categoria";
import { Estados } from "../models/estados";
import { Inventario } from "../models/inventario";
import { Productos } from "../models/productos";
import { Provedor } from "../models/provedor";

const invetarioInclude = [
  {
    model: Productos,
    as: "Productos",
    where: {
      estado_id: 1,
    },
    include: [
      {
        model: Categoria,
        as: "Categoria",
      },
      {
        model: Estados,
        as: "Estados",
      },
    ],
  },
  {
    model: Provedor,
    as: "Provedor",
  },
  {
    model: Almacenamiento,
    as: "Almacenamiento",
  },
];

const getInventario = async (req: Request, res: Response) => {
  try {
    const invetario = await Inventario.findAll({
      include: invetarioInclude,
      order: [["updatedAt", "DESC"]],
    });

    if (!invetario.length) {
      return res.status(200).send();
    }

    res.status(200).send({
      mensaje: "Inventario obtenido",
      invetario,
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
const createInvetario = async (req: Request, res: Response) => {
  try {
    const {
      producto_id,
      stock,
      precio,
      provedor_id,
      almacenamiento_id,
      fecha,
    } = req.body;

    const params = {
      producto_id,
      stock,
      precio,
      provedor_id,
      almacenamiento_id,
      fecha,
    };

    const inventario = await Inventario.create(params);

    if (!inventario) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Inventario creado",
      inventario,
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
const getInventarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inventario = await Inventario.findOne({
      where: { id },
      include: invetarioInclude,
    });

    if (!inventario) {
      return res.status(204).send();
    }

    res.status(200).send({
      mensaje: "Inventario obtenido",
      inventario,
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
const updateInventario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      producto_id,
      stock,
      precio,
      provedor_id,
      almacenamiento_id,
      fecha,
    } = req.body;
    const params = {
      producto_id,
      stock,
      precio,
      provedor_id,
      almacenamiento_id,
      fecha,
    };

    const inventario = await Inventario.update(params, { where: { id } });

    if (!inventario.length) {
      return res.status(200).send();
    }

    res.status(200).send({
      mensaje: "Inventario actualizado",
      inventario,
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
const eliminarInventario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inventario = await Inventario.destroy({ where: { id } });

    if (!inventario) {
      return res.status(204).send();
    }

    res.status(200).send({
      mesanje: "Inventario eliminado",
      inventario,
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
  getInventario,
  createInvetario,
  getInventarioById,
  updateInventario,
  eliminarInventario,
};
