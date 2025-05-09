// BALANCELIFE/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionModel.ts
import Database from '../../express/Database';

export default class Habito_AlimentacionModel {
  // Registrar alimentación usando el stored procedure
  public async registrarAlimentacion(
    p_usuario_id: number,
    p_tipo: string,
    p_calorias: number,
    p_fecha?: string
  ): Promise<any> {
    const fecha = p_fecha ? new Date(p_fecha) : new Date(); // Usamos la fecha del dispositivo
    const query = `CALL RegistrarAlimentacion(?, ?, ?, ?)`;
    const params = [p_usuario_id, p_tipo, p_calorias, fecha];
    return await Database.executeQuery(query, params);
  }

  // Obtener registros para estadísticas por mes
  public async obtenerCaloriasPorMes(
    p_usuario_id: number,
    p_mes: number,
    p_anio: number
  ): Promise<any[]> {
    const query = `CALL ObtenerCaloriasPorMes(?, ?, ?)`;
    const params = [p_usuario_id, p_mes, p_anio];
    const result = await Database.executeQuery(query, params);
    return result[0]; 
  }
}