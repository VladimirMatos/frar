import express=require('express');
const catetegoriaRouter:express.Router=express.Router();
import * as categoriaCtrl from "../controllers/categoria.controller";



catetegoriaRouter.get('/getCategorias',categoriaCtrl.getCategoria);
catetegoriaRouter.get('/getCategoriaById/:id',categoriaCtrl.getCategoriaById);
catetegoriaRouter.delete('/deleteCategoria/:id',categoriaCtrl.deleteCategoria);
catetegoriaRouter.post('/createCategoria',categoriaCtrl.createCategoria);
catetegoriaRouter.put('/updateCategoria/:id',categoriaCtrl.updateCategoria);



export default catetegoriaRouter;