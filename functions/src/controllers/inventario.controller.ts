import { Request, Response } from "express";
import { Almacenamiento } from "../models/almacenamiento";
import { Categoria } from "../models/categoria";
import { Estados } from "../models/estados";
import { Inventario } from "../models/inventario";
import { Productos } from "../models/productos";
import { Provedor } from "../models/provedor";
import { Op } from 'sequelize';

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
    const { id } = req.params;

    const producto = await Productos.findAll({
      where: {
        estado_id: 1,
        categoria_id: id
      }
    });

    const producto_id = producto.map((producto) => producto.id);


    const invetario = await Inventario.findAll({
      where: {
        producto_id:{
          [Op.in]: producto_id
        }
      },
      include: invetarioInclude,
      order: [["updatedAt", "DESC"]],
    });
    
    if (!invetario.length) {
      return res.status(200).send();
    }

    return res.status(200).send({
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
const getAllInventario = async (req: Request, res: Response) => {
  try {
    const invetario = await Inventario.findAll({
      include: invetarioInclude,
      order: [["updatedAt", "DESC"]],
    });

    if (!invetario.length) {
      return res.status(200).send();
    }

    return res.status(200).send({
      mensaje: "Inventario obtenido",
      invetario,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      error}
    );
   throw error;
    }
}
const createInvetario = async (req: Request, res: Response) => {
  try {

    const inventario = await Inventario.create(req.body);

    if (!inventario) {
      return res.status(204).send();
    }

    return res.status(200).send({
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

    return res.status(200).send({
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
    const inventario = await Inventario.findOne({ where: { id } });

    if (!inventario) {
      return res.status(200).send();
    }

    await inventario.update(req.body);

    return res.status(200).send({
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

    const inventario = await Inventario.findOne({ where: { id } });
    if (!inventario) {
      return res.status(204).send();
    }
    await inventario.destroy();

    return res.status(200).send({
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
  getAllInventario
};
