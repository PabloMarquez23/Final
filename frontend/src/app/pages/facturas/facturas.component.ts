import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  facturas: any[] = [];
  factura = { cliente_id: 0, fecha: '', total: 0 };
  editando = false;
  idEditando: number | null = null;

  constructor(private facturasService: FacturasService) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.facturasService.obtenerFacturas().subscribe(res => {
      this.facturas = res;
    });
  }

  guardarFactura(): void {
    if (this.editando && this.idEditando !== null) {
      this.facturasService.actualizarFactura(this.idEditando, this.factura).subscribe(() => {
        this.cargarFacturas();
        this.cancelarEdicion();
      });
    } else {
      this.facturasService.crearFactura(this.factura).subscribe(() => {
        this.cargarFacturas();
        this.factura = { cliente_id: 0, fecha: '', total: 0 };
      });
    }
  }

  editarFactura(factura: any): void {
    this.factura = { ...factura };
    this.idEditando = factura.id;
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.factura = { cliente_id: 0, fecha: '', total: 0 };
  }

  eliminarFactura(id: number): void {
    this.facturasService.eliminarFactura(id).subscribe(() => {
      this.cargarFacturas();
    });
  }
}
