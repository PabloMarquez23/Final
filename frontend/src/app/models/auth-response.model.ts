export interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    rol: 'cliente' | 'admin';
  };
}
