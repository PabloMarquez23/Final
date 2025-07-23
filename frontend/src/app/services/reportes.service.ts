import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteVentasDia } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReportes(): Observable<ReporteVentasDia[]> {
    return this.http.get<ReporteVentasDia[]>(`${this.apiUrl}/ventas-dia`);
  }
}
