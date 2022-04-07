import * as productCtrl from '../controllers/productos.controller'
import express=require('express');

const productosRouter:express.Router=express.Router();


productosRouter.get('/getProductos',productCtrl.getProductos);
productosRouter.get('/getProductosById/:id',productCtrl.getProductosById);
productosRouter.post('/createProductos',productCtrl.createProductos);
productosRouter.put('/updatedProductos/:id',productCtrl.updateProductos);
productosRouter.delete('/deleteProducto/:id',productCtrl.deleteProducto);
productosRouter.get('/getProductosBycategoria/:id',productCtrl.getProductosBycategoria);

export default productosRouter