import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Cart } from "../models/cart";
import { Factura } from "../models/factura";
import { FacturaDetalle } from "../models/factura-detalle";
import { Inventario } from "../models/inventario";
import { Productos } from "../models/productos";
import { Usuario } from "../models/usuario";

const getFacturas = async (req: Request, res: Response) => {
  try {
    const factura = await FacturaDetalle.findAll({
      include: [
        {
          model: Usuario,
          as: "Cliente",
        },
        {
          model: Factura,
          as: "Factura",
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    if (!factura.length) {
      return res.status(204).send();
    }
    return res.status(200).send({
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

        

        const facturaDetalle = await FacturaDetalle.create({
          libras: inventario.libras,
          precio_libras: inventario.Inventario.precio_libra,
          cantidad: inventario.cantidad,
          producto:inventario.Inventario.Productos.nombre,
          cliente_id: cliente_id,
        });

        return facturaDetalle;
      })
    );

    const factura = await Factura.create({ total, condiciones });

    await FacturaDetalle.update(
      { factura_id: factura.id },
      { where: { cliente_id } }
    );

    
    const detalle = await FacturaDetalle.findAll({ where: { cliente_id }, include: [{ model: Usuario, as: "Cliente" }] });

    const FacturaDetallada = {
      detalle,
      total: factura.total,
      condiciones,
    };

    if (!FacturaDetallada) {
      return res.status(204).send();
    }
    await Cart.destroy({
      where: { cliente_id },
    });
    return res.status(200).send({
      mensaje: "Factura creada",
      FacturaDetallada,
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
    const factura = await FacturaDetalle.findOne({
      where: { id },
      include: [
        {
          model: Usuario,
          as: "Cliente",
        },
        {
          model: Factura,
          as: "Factura",
        },
      ],
    });
    if (!factura) {
      return res.status(204).send();
    }
    return res.status(200).send({
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
    return res.status(200).send({
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
