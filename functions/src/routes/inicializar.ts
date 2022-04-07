import express=require('express');
const inicializarRouter:express.Router=express.Router();
import * as inicializarCtrl from "../controllers/inicializar.controller";


inicializarRouter.get('/inicializar',inicializarCtrl.inicializar)



export default inicializarRouter;