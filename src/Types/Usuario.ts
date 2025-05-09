export default interface UsuarioInterface {
  id_usuario: number;
  nombre: string;
  email: string;
  fecha_nacimiento?: Date;
  password?: string;
  fcm_token?: string;
}