export default interface RegisterAgua {
  id_registro_hidratacion?: number;
  id_usuario: number;
  fecha_hora: Date;
  cantidad_ml: number;
  tipo_bebida: string;
}