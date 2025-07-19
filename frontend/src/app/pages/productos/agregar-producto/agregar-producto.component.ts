import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      this.productosService.agregarProducto(this.productoForm.value).subscribe({
        next: () => {
          alert('Producto agregado exitosamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al agregar producto:', err);
          alert('Error al agregar producto');
        }
      });
    }
  }
}
