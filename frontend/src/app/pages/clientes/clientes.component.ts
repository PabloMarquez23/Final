import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  editando: boolean = false;
  idActual: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.obtenerClientes().subscribe({
      next: (res) => this.clientes = res,
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  guardarCliente(): void {
    const cliente = this.clienteForm.value;

    if (this.editando && this.idActual !== null) {
      this.clientesService.actualizarCliente(this.idActual, cliente).subscribe(() => {
        this.cargarClientes();
        this.resetearFormulario();
      });
    } else {
      this.clientesService.crearCliente(cliente).subscribe(() => {
        this.cargarClientes();
        this.resetearFormulario();
      });
    }
  }

  editarCliente(cliente: Cliente): void {
    this.editando = true;
    this.idActual = cliente.id;
    this.clienteForm.patchValue(cliente);
  }

  eliminarCliente(id: number): void {
    this.clientesService.eliminarCliente(id).subscribe(() => {
      this.cargarClientes();
    });
  }

  cancelarEdicion(): void {
    this.resetearFormulario();
  }

  resetearFormulario(): void {
    this.editando = false;
    this.idActual = null;
    this.clienteForm.reset();
  }
}
