export interface Factura {
  id: number;
  venta_id: number;
  cliente_nombre: string;
  cliente_correo: string;
  fecha: string;
  total: number;
  metodo_pago: 'efectivo' | 'transferencia' | 'tarjeta';
  detalle: {
    producto_id: number;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
  }[];
}
