import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  get estaLogueado(): boolean {
    return this.authService.estaAutenticado();
  }

   estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }
  get esAdmin(): boolean {
    return this.authService.obtenerRol() === 'admin';
  }

  get esCliente(): boolean {
    return this.authService.obtenerRol() === 'cliente';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    location.reload(); // o router.navigate(['/home']);
  }
}
