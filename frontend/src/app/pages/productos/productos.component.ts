import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  get esAdmin(): boolean {
    return this.authService.obtenerRol() === 'admin';
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (res) => {
        this.productos = res.map((p: any) => ({ ...p, cantidad: 1 }));
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  agregarProducto(): void {
    this.router.navigate(['/productos/agregar']);
  }

  editarProducto(producto: any): void {
    alert(`Editar producto: ${producto.nombre}`);
    // Puedes implementar redirección a componente de edición
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => console.error('Error al eliminar producto', err)
      });
    }
  }

  agregarAlCarrito(producto: any): void {
    const cantidad = producto.cantidad || 1;
    this.carritoService.agregarProducto(producto, cantidad);
    alert(`Producto "${producto.nombre}" agregado al carrito`);
  }
}
