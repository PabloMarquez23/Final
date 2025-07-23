import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../../services/reportes.service';
import { ReporteVentasDia } from '../../models/reporte.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [ReportesService]
})
export class ReportesComponent implements OnInit {
  reportes: ReporteVentasDia[] = [];

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.reportesService.obtenerReportes().subscribe({
      next: (res) => this.reportes = res,
      error: (err) => console.error('Error al cargar reportes', err)
    });
  }
}
