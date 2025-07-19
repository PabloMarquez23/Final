import { Component } from '@angular/core';
import { NavbarComponent } from './pages/navbar/navbar.component'; // Ajusta la ruta si es diferente
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent,RouterModule],  // Aquí se importa el componente navbar
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
