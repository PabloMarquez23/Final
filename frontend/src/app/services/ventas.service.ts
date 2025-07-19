import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost:3000/api/ventas';

  constructor(private http: HttpClient) {}

  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }
}
