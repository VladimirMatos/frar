import express=require('express');
const inventarioRouter:express.Router=express.Router();
import * as inventarioController from "../controllers/inventario.controller";


inventarioRouter.get('/getInventario/:id',inventarioController.getInventario);
inventarioRouter.get('/getInventarioById/:id',inventarioController.getInventarioById);
inventarioRouter.post('/createInventario',inventarioController.createInvetario);
inventarioRouter.put('/updateInventario/:id',inventarioController.updateInventario);
inventarioRouter.delete('/deleteInventario/:id',inventarioController.eliminarInventario);




export default inventarioRouter