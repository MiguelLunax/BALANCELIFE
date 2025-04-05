export default interface Usuario {
  id_usuario?: number;
  nombre: string;
  email: string;
  password?: string;
  fecha_registro?: Date;
  peso?: number;
  altura?: number;
  edad?: number;
  genero?: string;
  meta_diaria_agua?: number;
  meta_horas_sueno?: number;
  nivel?: number;
  puntos?: number;
}