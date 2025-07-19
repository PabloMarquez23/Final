import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [ReportesService] // <-- Puedes añadir esto si no usas `providedIn: 'root'` en el servicio
})
export class ReportesComponent implements OnInit {
  reportes: any = {};

  constructor(private reportesService: ReportesService) {} // <-- Asegúrate que el nombre esté correcto

  ngOnInit(): void {
    this.reportesService.obtenerReportes().subscribe({
      next: (res) => this.reportes = res,
      error: (err) => console.error('Error al cargar reportes', err)
    });
  }
}
