import { Model } from "sequelize";

export interface InventarioAttr extends Model {
    id: number;
    producto_id: number;
    stock: number;
    precio_libra: number;
    provedor_id: number;
    almacenamiento_id: number;
    fecha: string;
}


