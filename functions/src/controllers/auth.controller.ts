import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario';


const login = async (req: Request, res: Response) => {
    try{
        const { email, contrasena } = req.body;
        const user = await Usuario.findOne({
            where: { email }
        })
        if(user?.role_id !== 1 ){
            return res.status(200).send({
                mensage:'User not valid',
                mensaje:'Usuario no valido'
            })
        }
        
        if(!user){
            return res.status(400).send({
                message: 'Wrong email',
                mensaje: 'Email incorrecto',
                status: 404
            })
        }
       

        /**
         * Password verification
         */

            const passwordMatch = await bcrypt.compare(contrasena,user.contrasena);
            
            if(!passwordMatch){
                return res.status(400).send({
                    message: 'Wrong password',
                    mensaje: 'Contraseña incorrecta',
                    status: 409
                })
            }
        
        
            return  res.status(200).send({
            message: "Welcome",
            mensaje: "Bienvenido",
            user
        })
    }catch(error){
        res.status(500).send({
            mensaje: 'Error desconocido',
            message: 'Unknow error',
            error
        })

        throw error
    }
}

export{
    login
}