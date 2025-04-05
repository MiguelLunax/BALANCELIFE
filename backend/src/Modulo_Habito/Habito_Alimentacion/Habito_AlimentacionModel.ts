// BALANCELIFE/backend/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionModel.ts
import Database from '../../express/Database';
import AuthService from '../../services/AuthService';

export default class Habito_AlimentacionModel {
  public async registrarAlimentacion(tipo_comida: string, cantidad: number, calorias: number, fecha?: string): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();
    const fecha_registro = fecha ? new Date(fecha) : new Date();

    const query = `INSERT INTO registro_alimentacion (id_usuario, tipo_comida, cantidad, calorias, fecha_registro) 
                       VALUES (?, ?, ?, ?, ?)`;
    const params = [id_usuario, tipo_comida, cantidad, calorias, fecha_registro];
    return await Database.executeQuery(query, params);
  }

  public async obtenerRegistros(): Promise<any[]> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT * FROM registro_alimentacion 
                       WHERE id_usuario = ? 
                       ORDER BY fecha_registro DESC`;
    return await Database.executeQuery(query, [id_usuario]);
  }

  public async obtenerTotalCaloriasDiario(fecha?: string): Promise<number> {
    const id_usuario = AuthService.getActiveUserId();
    let fechaConsulta = fecha || new Date().toISOString().split('T')[0];

    const query = `SELECT SUM(calorias) as total 
                       FROM registro_alimentacion 
                       WHERE id_usuario = ? 
                       AND DATE(fecha_registro) = ?`;
    const result = await Database.executeQuery(query, [id_usuario, fechaConsulta]);
    return result[0].total || 0;
  }

  public async eliminarRegistro(id_registro: number): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `DELETE FROM registro_alimentacion 
                       WHERE id_registro = ? AND id_usuario = ?`;
    return await Database.executeQuery(query, [id_registro, id_usuario]);
  }

  public async obtenerEstadisticasPorTipoComida(): Promise<any[]> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT tipo_comida, SUM(calorias) as total_calorias, COUNT(*) as total_registros
                       FROM registro_alimentacion 
                       WHERE id_usuario = ? 
                       GROUP BY tipo_comida 
                       ORDER BY total_calorias DESC`;
    return await Database.executeQuery(query, [id_usuario]);
  }
}