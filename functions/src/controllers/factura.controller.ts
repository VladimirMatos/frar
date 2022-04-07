import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Cart } from "../models/cart";
import { Factura } from "../models/factura";
import { Inventario } from "../models/inventario";
import { Productos } from "../models/productos";
import { Usuario } from "../models/usuario";

const getFacturas = async (req: Request, res: Response) => {
  try {
    const factura = await Factura.findAll({
      include: [
        {
          model: Usuario,
          as: "Cliente",
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    if (!factura.length) {
      return res.status(204).send();
    }
    res.status(200).send({
      mensaje: "Retorna las facturas",
      factura,
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
const createFactura = async (req: Request, res: Response) => {
  try {
    const { cliente_id, condiciones } = req.body;

    const inventario: any = await Cart.findAll({
      where: { cliente_id },
      include: {
        model: Inventario,
        as: "Inventario",
        include: [
          {
            model: Productos,
            as: "Productos",
          },
        ],
      },
    });

    let total = 0;
    let precio_libras: any = [];
    let cantidad: any = [];
    let libras: any = [];
    let producto: any = [];
    await Promise.all(
      inventario.map(async (inventario: any) => {
        const checkStock2 = inventario.Inventario.stock < inventario.cantidad;
        const checkStock = inventario.Inventario.stock == 0;
        if (checkStock) {
          return res.status(200).send({
            message: "Producto fuera de stock",
          });
        }

        if (checkStock2) {
          return res.status(200).send({
            message: "Cantidad mayor al stock",
          });
        }
        await Inventario.update(
          {
            stock: Sequelize.literal(`stock - ${inventario.cantidad}`),
          },
          {
            where: { id: inventario.inventario_id },
          }
        );
        const check = await Inventario.findOne({
          where: { id: inventario.inventario_id },
        });
        if (check?.stock == 0) {
          await Productos.update(
            { estado_id: 2 },
            { where: { id: inventario.Inventario.producto_id } }
          );
        }

        const sub_total =
          inventario.Inventario.precio_libra * inventario.libras;
        total = total + sub_total;

        precio_libras.push(inventario.Inventario.precio_libra);
        cantidad.push(inventario.cantidad);
        libras.push(inventario.libras);
        producto.push(inventario.Inventario.Productos.nombre);
      })
    );

    // const calculo = inventario.precio * cantidad;
    const params = {
      cliente_id,
      condiciones,
      total,
      precio_libras,
      cantidad,
      libras,
      producto,
    };
    const factura = await Factura.create(params);
    if (!factura) {
      return res.status(204).send();
    }
    await Cart.destroy({
      where: { cliente_id },
    });
    res.status(200).send({
      mensaje: "Retorna las facturas",
      factura,
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
const getFacturaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findOne({
      where: { id },
      include: [
        {
          model: Usuario,
          as: "Cliente",
        },
      ],
    });
    if (!factura) {
      return res.status(204).send();
    }
    res.status(200).send({
      mensaje: "Retorna las facturas",
      factura,
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
const deleteFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await Factura.destroy({ where: { id } });
    if (!factura) {
      return res.status(204).send();
    }
    res.status(200).send({
      mensaje: "Facturas eliminada",
      factura,
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

export { createFactura, getFacturas, getFacturaById, deleteFactura };
