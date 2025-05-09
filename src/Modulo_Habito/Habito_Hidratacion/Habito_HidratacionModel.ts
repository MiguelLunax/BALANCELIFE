// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionModel.ts
import Database from '../../express/Database';

export default class Habito_HidratacionModel {
  // Registra una nueva cantidad de agua consumida usando el stored procedure
  public async registrarHidratacion(cantidad: number, p_fecha?: string): Promise<void> {
    const id_usuario = 1; // Aquí deberías recibir el ID del usuario desde req.body
    const fecha = p_fecha ? new Date(p_fecha) : undefined; // Fecha opcional desde el dispositivo
    const query = `CALL RegistrarHidratacion(?, ?, ?)`;
    const params = [id_usuario, cantidad, fecha];
    await Database.executeQuery(query, params);
  }

  // Obtiene estadísticas de hidratación por mes o año
  public async obtenerEstadisticas(mes?: number, anio: number = new Date().getFullYear()): Promise<any> {
    const id_usuario = 1; // Aquí deberías recibir el ID del usuario desde req.body
    const query = `CALL ObtenerEstadisticasHidratacion(?, ?, ?)`;
    const params = [id_usuario, mes ?? null, anio];
    const result = await Database.executeQuery(query, params);
    return result;
  }
}