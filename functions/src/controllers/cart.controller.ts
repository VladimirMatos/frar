import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Cart } from "../models/cart";
import { Inventario } from "../models/inventario";
import { Productos } from "../models/productos";
import { Usuario } from "../models/usuario";

const getCart = async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.params;
    if (!cliente_id) {
      return res.sendStatus(204);
    }
    const cartdetail = await Cart.findAll({
      include: [
        {
          model: Inventario,
          as: "Inventario",
          include:[
              {
                    model: Productos,
                    as: "Productos",
              }
          ]
        },
        {
            model: Usuario,
            as: "Cliente",
            attributes: ["id", "nombre_empresa"],
        }
      ],
      where: {
        cliente_id,
      },
      order: [["updatedAt", "DESC"]],
    });

    if (!cartdetail.length) {
      return res.sendStatus(204);
    }
    return res.status(200).send({
      message: "Detalle de carrito",
      cartdetail,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const addToCart = async (req: Request, res: Response) => {
  try {
    const { cliente_id, cantidad, libras, inventario_id } = req.body;
    const params = {
      cliente_id,
      cantidad,
      libras,
      inventario_id,
    };
    const products = await Cart.findOne({
      where: { cliente_id, inventario_id },
    });
    if (products) {
      const product_updated = await Cart.update(
        {
          cantidad: Sequelize.literal(`cantidad + ${cantidad}`),
        },
        { where: { id: products.id, cliente_id, inventario_id } }
      );
      return res.status(200).send({
        message: "Product updated",
        product_updated,
      });
    }
    const create = await Cart.create(params);

    if (!create) {
      return res.status(200).json({
        message: "Not products",
      });
    }

    return res.status(200).json({
      message: "Product add in cart",
      create,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Ha ocurrido un error",
      messaje: "It has ocurred an error",
      error,
    });

    throw error;
  }
};
const deleteAllCart = async (req: Request, res: Response) => {
  try {
    const { cliente_id } = req.params;
    const getcart = await Cart.findAll({
        where: { cliente_id },
    });
    const cart = await Cart.destroy({
      where: {
        cliente_id,
      },
    });

    if (!cart) {
      return res.sendStatus(204);
    }

    return res.status(200).send({
      message: "Cart deleted",
      getcart,
    });
  } catch (error) {
    res.status(400).send({
      mensaje: "Ha ocurrido un error",
      error,
    });
    throw error;
  }
};
const deleteCart = async (req: Request, res: Response) => {
    try { 
        const {id} = req.params;
        const cart = await Cart.findOne({where: {id}});

        if (!cart) {
            return res.sendStatus(204);
        }
        await cart.destroy();
        return res.status(200).send({
            message: "Cart deleted",
            cart,
        });
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error,
        });
        throw error;
    }
}
export { getCart, addToCart, deleteAllCart, deleteCart };
