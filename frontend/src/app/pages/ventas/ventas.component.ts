import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventaForm: FormGroup;
  ventas: any[] = [];
  mensajeExito = '';
  error = '';

  constructor(private fb: FormBuilder, private ventasService: VentasService) {
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  registrarVenta() {
    if (this.ventaForm.valid) {
      this.ventasService.crearVenta(this.ventaForm.value).subscribe({
        next: () => {
          this.mensajeExito = 'Venta registrada correctamente';
          this.ventaForm.reset({ cantidad: 1 });
          this.obtenerVentas();
          this.error = '';
        },
        error: err => {
          this.error = 'Error al registrar la venta';
          console.error(err);
        }
      });
    }
  }

  obtenerVentas() {
    this.ventasService.obtenerVentas().subscribe({
      next: data => {
        this.ventas = data;
      },
      error: err => {
        console.error('Error al cargar ventas', err);
      }
    });
  }
}
