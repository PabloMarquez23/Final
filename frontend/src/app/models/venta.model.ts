export interface Venta {
  id: number;
  cliente_id: number;
  productos: {
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }[];
  total: number;
  fecha: string;
  metodo_pago: 'efectivo' | 'transferencia' | 'tarjeta';
}
