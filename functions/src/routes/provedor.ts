import express=require('express');
const provedorRouter:express.Router=express.Router();
import * as provedorController from "../controllers/provedor.controller";


provedorRouter.get('/getProvedor',provedorController.getProvedor);
provedorRouter.get('/getProvedorById/:id',provedorController.getProvedorById);
provedorRouter.post('/createProvedor',provedorController.createProvedor);
provedorRouter.put('/updateProvedor/:id',provedorController.updateProvedor);
provedorRouter.delete('/deleteProvedor/:id',provedorController.deleteProvedor);


export default provedorRouter;