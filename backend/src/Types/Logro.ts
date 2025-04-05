export default interface Logro {
  id_logro?: number;
  nombre: string;
  descripcion: string;
  fecha_desbloqueo?: Date;
  puntos_ganados: number;
  id_usuario?: number;
  estado?: boolean;
}