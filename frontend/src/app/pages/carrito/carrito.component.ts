import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  providers: [VentasService]
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  clienteId: number | null = null;

  constructor(
    private carritoService: CarritoService,
    private ventasService: VentasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();

    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.clienteId = user.id;
    }
  }

  eliminarDelCarrito(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    );
  }

  confirmarCompra(): void {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('Debes iniciar sesión para realizar una compra.');
      return;
    }

    const usuario = JSON.parse(usuarioStr);

    const productos = this.carrito.map(item => ({
      producto_id: item.producto.id,
      cantidad: item.cantidad
    }));

    if (!usuario.id || productos.length === 0) {
      alert('Faltan datos para registrar la venta.');
      return;
    }

    const body = {
      cliente_id: usuario.id,
      productos
    };

    this.ventasService.crearVenta(body).subscribe({
      next: res => {
        alert('Compra realizada correctamente.');
        this.carrito = [];
        this.carritoService.limpiarCarrito();
      },
      error: err => {
        console.error('Error al confirmar compra:', err);
        alert('Error al procesar la compra.');
      }
    });
  }
}
