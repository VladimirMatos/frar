import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';



const getCategoria = async (req: Request, res: Response) => {
    try {
        const categoria = await Categoria.findAll();
        if (!categoria) {
            return res.status(204).send();
        }
        return res.status(200).send({
            mensaje: "Categorias obtenidas",
            categoria,
        }
        );
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error,
        });
        throw error;
    }
}
const getCategoriaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findOne({
            where: { id }
        })
        if (!categoria) {
            return res.status(204).send();
        }
        return res.status(200).send({
            mensaje: "Categoria obtenida",
            categoria
        });
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error        
        })
        throw error;
    }
}
const createCategoria = async (req: Request, res: Response) => {
    try {
        const categoria = await Categoria.create(req.body);
        if (!categoria) {
            return res.status(204).send();
        }
        return res.status(201).send({
            mensaje: "Categoria creada",
            categoria
        });
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error
        });
        throw error;
    }
}
const updateCategoria = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const categoria = await Categoria.findOne({
            where: { id }
        })
        if (!categoria) {
            return res.status(204).send();
        }
        await categoria.update(req.body);
        return res.status(200).send({
            mensaje: "Categoria actualizada",
            categoria
        });

    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error
        });
        throw error; 
    }
}
const deleteCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findOne({
            where: { id }
        })
        if (!categoria) {
            return res.status(204).send();
        }
        await categoria.destroy();
        return res.status(200).send({
            mensaje: "Categoria eliminada",
            categoria
        });
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            error
        });
        throw error;
    }
}

export { getCategoria,getCategoriaById,createCategoria,updateCategoria,
    deleteCategoria };