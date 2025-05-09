import Database from '../../express/Database';

export default class Habito_HidratacionModel {

  // Registra una nueva cantidad de agua consumida 
  public async registrarHidratacion(id: number, cantidad: number): Promise<void> {

    const query = `CALL RegistrarHidratacion(?, ?)`;
    const params = [id, cantidad];
    await Database.executeQuery(query, params);
  }

  // Obtiene estadísticas de hidratación por mes
  public async obtenerEstadisticas(id: number, mes: number, anio: number): Promise<any> {
    const query = `CALL ObtenerEstadisticasHidratacion(?, ?, ?)`;
    const params = [id, mes, anio];
    const result = await Database.executeQuery(query, params);
    return result[0];
  }
}