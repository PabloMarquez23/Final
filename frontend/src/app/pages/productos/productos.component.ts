import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../services/productos.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(
  private productosService: ProductosService,
  private authService: AuthService,
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
        this.productos = res;
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
    // Aquí podrías redirigir o abrir modal con los datos
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: () => {
          this.obtenerProductos();
        },
        error: (err) => {
          console.error('Error al eliminar producto', err);
        }
      });
    }
  }
}
