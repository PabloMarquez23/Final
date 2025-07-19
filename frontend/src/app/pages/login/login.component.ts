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
          const rol = res?.usuario?.rol || 'cliente'; // fallback si por alguna razón no viene el rol
          this.authService.guardarSesion('token-falso', rol); // puedes generar un token real luego si deseas
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
