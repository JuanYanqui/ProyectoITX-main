import { Categoria } from '../../modules/models/categoria';
import { Empresa } from '../../modules/models/Empresa';
import { Proveedor } from '../../modules/models/proveedor';
export interface Producto {
  id?: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  comentario: string;
  peso: number;
  oferta_descuento: number;
  precio_compra: number;
  precio_compra_no_iva?: number;
  valor_iva: number;
  precio_venta: number;
  precio_ventas: Array<any>;
  unidades_medida: Array<any>;
  estado: boolean;
  iva: boolean;
  cantidad?: number;
  cantidad_reserva?: number;
  imagen: string;
  categorias: Categoria[];
  proveedores: Proveedor[];
  empresa: Empresa;
}
interface unidades {
  [key: string]: [];
}