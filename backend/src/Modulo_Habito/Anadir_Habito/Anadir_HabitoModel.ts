// BALANCELIFE/backend/src/Modulo_Habito/Anadir_Habito/Anadir_HabitoModel.ts
import Database from '../../express/Database';
import AuthService from '../../services/AuthService';
import Habito from '../../Types/Habito';

export default class Anadir_HabitoModel {
  public async crearHabito(descripcion: string, frecuencia: string, tipo: string): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();
    const fecha = new Date();
    const query = `INSERT INTO abstract_habito (id_usuario, descripcion, frecuencia, fecha, tipo) 
                       VALUES (?, ?, ?, ?, ?)`;
    const params = [id_usuario, descripcion, frecuencia, fecha, tipo];
    return await Database.executeQuery(query, params);
  }

  public async obtenerHabitos(): Promise<Habito[]> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT * FROM abstract_habito 
                       WHERE id_usuario = ? 
                       ORDER BY fecha DESC`;
    return await Database.executeQuery(query, [id_usuario]);
  }

  public async obtenerHabitoPorId(id_habito: number): Promise<Habito | null> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT * FROM abstract_habito 
                       WHERE id_habito = ? AND id_usuario = ?`;
    const result = await Database.executeQuery(query, [id_habito, id_usuario]);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }

  public async actualizarHabito(id_habito: number, descripcion: string, frecuencia: string, tipo: string): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `UPDATE abstract_habito 
                       SET descripcion = ?, frecuencia = ?, tipo = ? 
                       WHERE id_habito = ? AND id_usuario = ?`;
    const params = [descripcion, frecuencia, tipo, id_habito, id_usuario];
    return await Database.executeQuery(query, params);
  }

  public async eliminarHabito(id_habito: number): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `DELETE FROM abstract_habito 
                       WHERE id_habito = ? AND id_usuario = ?`;
    return await Database.executeQuery(query, [id_habito, id_usuario]);
  }
}