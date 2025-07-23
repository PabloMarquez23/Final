import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeExito: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
  nombre: ['', Validators.required],
  correo: ['', [Validators.required, Validators.email]],
  contrasena: ['', Validators.required],
  rol: ['cliente']  // Valor fijo
});

  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe({
        next: () => {
          this.mensajeExito = 'Registro exitoso. Ahora puedes iniciar sesión.';
          this.registroForm.reset({ rol: 'cliente' });
          this.error = '';
        },
        error: (err) => {
          this.error = 'Ocurrió un error al registrar.';
          console.error(err);
        }
      });
    }
  }
}
