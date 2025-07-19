import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  // Cambiado para apuntar a /ventas-dia
  obtenerReportes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ventas-dia`);
  }
}
