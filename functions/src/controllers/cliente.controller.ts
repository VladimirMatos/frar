import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';


const getClientes = async (req: Request, res: Response) => {
    try {
        const user = await Usuario.findAll({
            where: {
                role_id: 2
            },
            order:[
                ['updated_at','DESC']
            ]
        })
        if (!user.length) {
            return res.status(204).send({
                mensaje: "No hay usuario",
                message: "There are not users"
            })
        }
        return  res.status(200).send({
            mensaje: "Retorna los usuarios",
            message: "Returns the users",
            user
        })
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            messaje: "It has ocurred an error",
            error
        })

        throw error
    }

}
const createCliente = async (req: Request, res: Response) =>{
    try {

        const user = await Usuario.create({...req.body,role_id:2});

        if (!user) {
            return res.status(204).send()
        }

        return  res.status(200).send({
            mensaje:'Usuario creado',
            user
        })
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            messaje: "It has ocurred an error",
            error
        })

        throw error
    }
}
const updateCliente = async  (req: Request, res: Response) =>{
    try {
        const {id} = req.params

        const user = await Usuario.findOne({where:{id}})

        if(!user){
            return res.status(204).send()
        }

       await user.update(req.body)

        return  res.status(200).send({
            message:'Usuario actualizado',
            user
        })
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            messaje: "It has ocurred an error",
            error
        })

        throw error
    }
}
const getClienteById =async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const users = await Usuario.findOne({where:{id}})

        if(!users){
            return res.status(204).send()
        }

        return  res.status(200).send({
            mensaje:'Cliente obtenido',
            users
        })
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            messaje: "It has ocurred an error",
            error
        })

        throw error
    }
}
const deleteCliente = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params

        const users = await Usuario.findOne({where:{id}})

        if(!users){
            return res.status(204).send()
        }

        await users.destroy()

        return  res.status(200).send({
            mensaje:'Usuario eliminado',
            users
        })
    } catch (error) {
        res.status(400).send({
            mensaje: "Ha ocurrido un error",
            messaje: "It has ocurred an error",
            error
        })

        throw error 
    }
}




export {
    getClientes,createCliente,updateCliente,getClienteById,deleteCliente
}