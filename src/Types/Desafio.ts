export default interface Desafio {
  id_desafio?: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  duracion_dias: number;
  puntos_recompensa: number;
  fecha_inicio: string;
  fecha_fin: string;
}