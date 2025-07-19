import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (user?.role === 'admin') {
      this.isAdmin = true;
    } else {
      alert('Acceso denegado. Se requiere rol de administrador.');
      this.router.navigate(['/home']);
    }
  }
}
