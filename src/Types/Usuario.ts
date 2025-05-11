export default interface UsuarioInterface {
  id_usuario: number;
  nombre: string;
  email: string;
  birthdate: Date;
  password?: string;
  fcm_token?: string;
}