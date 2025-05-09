export default interface UsuarioInterface {
  id_usuario: number;
  nombre: string;
  email: string;
  password?: string;
  fecha_registro?: Date;
}