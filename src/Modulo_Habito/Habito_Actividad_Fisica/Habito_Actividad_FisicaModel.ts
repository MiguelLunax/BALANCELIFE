// BALANCELIFE/src/Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaModel.ts
import Database from '../../express/Database';

export default class Habito_Actividad_FisicaModel {
  // Registrar actividad física usando el stored procedure
  public async registrarActividad(
    usuario_id: number,
    pasos: number,
    kilometros: number,
    fecha?: string
  ): Promise<void> {
    const query = `CALL RegistrarActividadFisica(?, ?, ?, ?)`;
    const params = [usuario_id, pasos, kilometros, fecha || null];
    await Database.executeQuery(query, params);
  }

  // Obtener estadísticas por mes y año
  public async obtenerEstadisticas(p_usuario_id: number, p_mes: number, p_anio: number): Promise<any[]> {
    const query = `CALL ObtenerEstadisticasActividadFisica(?, ?, ?)`;
    const params = [p_usuario_id, p_mes, p_anio];
    const result = await Database.executeQuery(query, params);
    return result[0]; // Retorna el primer conjunto de resultados
  }
}