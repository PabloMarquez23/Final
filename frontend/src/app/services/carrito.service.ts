import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {}

  agregarProducto(producto: any, cantidad: number = 1): void {
    const index = this.carrito.findIndex(item => item.producto.id === producto.id);
    if (index >= 0) {
      this.carrito[index].cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
  }

  eliminarProducto(productoId: number): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== productoId);
  }

  obtenerCarrito(): any[] {
    return this.carrito;
  }

  limpiarCarrito(): void {
    this.carrito = [];
  }
}
