import express=require('express');
const facturaRouter:express.Router=express.Router();
import * as facturaController from "../controllers/factura.controller";



facturaRouter.get('/getFacturas/:id',facturaController.getFacturas);
facturaRouter.get('/getFacturaById/:id',facturaController.getFacturaById);
facturaRouter.delete('/deleteFactura/:id',facturaController.deleteFactura)
facturaRouter.post('/createFactura',facturaController.createFactura);




export default facturaRouter;