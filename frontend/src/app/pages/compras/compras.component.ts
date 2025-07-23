import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule],
  providers: [VentasService, DatePipe],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras: any[] = [];
  clienteId: number | null = null;

  constructor(
    private ventasService: VentasService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.clienteId = user.id;
      if (this.clienteId !== null) {
        this.obtenerCompras(this.clienteId);
      }
    }
  }

  obtenerCompras(clienteId: number): void {
    this.ventasService.obtenerComprasPorCliente(clienteId).subscribe({
      next: (res) => {
        console.log('Compras obtenidas:', res);
        this.compras = res;
      },
      error: (err) => {
        console.error('Error al obtener compras:', err);
      }
    });
  }

  formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, 'short') || fecha;
  }
}
