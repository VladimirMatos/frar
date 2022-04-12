import { Request, Response } from "express";
import { Op } from "sequelize";
import { Productos } from "../models/productos";

const getProductos = async (req: Request, res: Response) => {
  try {
    const {initial_date, final_date} = req.body;
    let productos
    if(initial_date && final_date){
      productos = await Productos.count({
        where: {
          createdAt: {
            [Op.between]: [initial_date, final_date]
          }
        }
      });
    }else{
      productos = await Productos.count();
    }
    if (!productos) {
      return res.status(204).send();
    }
    return res.status(200).send({
      mensaje: "Productos obtenidos",
      productos,
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
const createProductos = async (req: Request, res: Response) => {
  try {
    const { nombre, categoria_id, estado_id } = req.body;

    const params = {
      nombre,
      categoria_id,
      estado_id,
    };

    const productos = await Productos.create(params);

    if (!productos) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Producto creado",
      productos,
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
const updateProductos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, subcategoria_id, estado_id } = req.body;

    const params = {
      nombre,
      subcategoria_id,
      estado_id,
    };

    const productos = await Productos.update(params, { where: { id } });

    if (!productos.length) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Producto actualizado",
      productos,
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
const getProductosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const producto = await Productos.findOne({ where: { id } });

    if (!producto) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Producto obtenido",
      producto,
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
const deleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const producto = await Productos.destroy({ where: { id } });

    if (!producto) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Producto eliminado",
      producto,
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
const getProductosBycategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const producto = await Productos.findAll({
      where: { categoria_id: id, estado_id: 1 },
    });

    if (!producto.length) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Productos obtenidos",
      producto,
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
  getProductos,
  createProductos,
  updateProductos,
  getProductosById,
  deleteProducto,
  getProductosBycategoria,
};
