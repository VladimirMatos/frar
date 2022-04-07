import express=require('express');
const userRouter:express.Router=express.Router();
import * as userCtrl from "../controllers/usuario.controller";

userRouter.get('/getUsers',userCtrl.getUsuarios);
userRouter.post('/createUsers',userCtrl.createUsuarios);
userRouter.put('/updateUsers/:id',userCtrl.updateUsuarios);
userRouter.get('/getUsersById/:id',userCtrl.getUsuariosById);
userRouter.delete('/deleteUser/:id', userCtrl.deleteUsuario);



export default userRouter;