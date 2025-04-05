export default interface Habito {
  id_habito?: number;
  nombre: string;
  descripcion: string;
  id_usuario?: number;
  frecuencia?: string;
  fecha?: Date;
  estado?: boolean;
  tipo?: string;
}