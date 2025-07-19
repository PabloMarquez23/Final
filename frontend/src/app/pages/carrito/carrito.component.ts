import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarDelCarrito(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  confirmarCompra(): void {
    // Aquí puedes llamar a un servicio de ventas o mostrar una alerta
    alert('Compra confirmada. Gracias por su compra.');
    this.carritoService.limpiarCarrito();
    this.carrito = [];
  }
}
