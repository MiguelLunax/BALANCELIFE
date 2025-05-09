// BALANCELIFE/src/Modulo_Habito/Habito_Sueno/Habito_SuenoModel.ts
import Database from '../../express/Database';

export default class Habito_SuenoModel {
  // Registrar sueño usando el stored procedure
  public async registrarSueno(
    usuario_id: number,
    duracion_horas: number,
    fecha?: string
  ): Promise<void> {
    const query = `CALL RegistrarSueno(?, ?, ?)`;
    const params = [usuario_id, duracion_horas, fecha || null];
    await Database.executeQuery(query, params);
  }

  // Obtener estadísticas por mes y año
  public async obtenerEstadisticas(p_usuario_id: number, p_mes: number, p_anio: number): Promise<any[]> {
    const query = `CALL ObtenerEstadisticasSueno(?, ?, ?)`;
    const params = [p_usuario_id, p_mes, p_anio];
    return await Database.executeQuery(query, params);
  }
}