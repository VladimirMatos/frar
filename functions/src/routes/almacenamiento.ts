import express=require('express');
const almacenamientoRouter:express.Router=express.Router();
import * as almacenamientoController from "../controllers/almacenamiento.controller";

almacenamientoRouter.get('/getAlmacenamiento',almacenamientoController.getAlmacenamiento);
almacenamientoRouter.get('/getAlmacenamientoById/:id',almacenamientoController.getAlmacenamientoById);
almacenamientoRouter.post('/createAlmacenamiento',almacenamientoController.createAlmacenamiento);
almacenamientoRouter.put('/updateAlmacenamiento/:id',almacenamientoController.updateAlmacenamiento);
almacenamientoRouter.delete('/deleteAlmacenamiento/:id',almacenamientoController.deleteAlmacenamiento);



export default almacenamientoRouter;