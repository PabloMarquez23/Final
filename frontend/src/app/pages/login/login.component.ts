import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Login response:', res);

          const token = res.token || 'token-falso';
          const usuario = {
            id: res.id,
            nombre: res.nombre,
            correo: res.correo,
            rol: res.rol || 'cliente'
          };

          this.authService.guardarSesion(token, usuario.rol, usuario);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = 'Correo o contraseña incorrectos';
          console.error('Login fallido:', err);
        }
      });
    }
  }
}
