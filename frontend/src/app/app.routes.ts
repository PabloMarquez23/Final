import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReportesComponent } from './pages/admin/reportes/reportes.component';
import { AgregarProductoComponent } from './pages/productos/agregar-producto/agregar-producto.component';
import { ComprasComponent } from './pages/compras/compras.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'productos/agregar', component: AgregarProductoComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'home', component: HomeComponent }


];
