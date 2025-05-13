export default interface UsuarioInterface {
  id_usuario: number;
  nombre: string;
  email: string;
  birthdate: Date;
  password?: string;
  fcm_token?: string;
  meta_hidratacion?: string;
  meta_deporte?: string;
  meta_sueno?: string;
  meta_alimentacion?: string;

}