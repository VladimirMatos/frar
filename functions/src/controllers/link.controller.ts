import { Request, Response } from "express";
import { Link } from "../models/Link";
import { Op } from "sequelize";


const getLinks = async (req: Request, res: Response) => {
  try {
    const link = await Link.findAll();
    if (!link.length) {
      return res.status(204).send({
        mensaje: "No hay Links",
        message: "There are not links",
      });
    }
    return res.status(200).send({
      mensaje: "Retorna los Links",
      message: "Returns the links",
      link,
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
const getLinksByParams = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;

    const links = await Link.findAll({ where: {[Op.or]:{ URL:{
      [Op.like]: `%${filter}%`,
    }}} 
  });

    if (!links.length) {
      return res.status(204).send();
    }

    return res.status(200).send({
      mensaje: "Link obtenido",
      links,
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
  getLinks,
  getLinksByParams,
};
