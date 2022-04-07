import express=require('express');
const userRouter:express.Router=express.Router();
import * as clienteCtrl from "../controllers/cliente.controller";

userRouter.get('/getCliente',clienteCtrl.getClientes);
userRouter.post('/createCliente',clienteCtrl.createCliente);
userRouter.put('/updateCliente/:id',clienteCtrl.updateCliente);
userRouter.get('/getClienteById/:id',clienteCtrl.getClienteById);
userRouter.delete('/deleteCliente/:id', clienteCtrl.deleteCliente);


export default userRouter;