// BALANCELIFE/backend/src/Modulo_Tutorial/TutorialModel.ts
import Database from '../express/Database';
import AuthService from '../services/AuthService';

export default class TutorialModel {
  public async obtenerTutoriales(): Promise<any[]> {
    const query = `SELECT * FROM TUTORIAL ORDER BY orden`;
    return await Database.executeQuery(query);
  }

  public async obtenerTutorialPorId(id_tutorial: number): Promise<any> {
    const query = `SELECT * FROM TUTORIAL WHERE id_tutorial = ?`;
    const result = await Database.executeQuery(query, [id_tutorial]);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }

  public async marcarTutorialComoVisto(id_tutorial: number): Promise<any> {
    const id_usuario = AuthService.getActiveUserId();

    // Verificar si ya existe el registro
    const checkQuery = `SELECT * FROM usuario_tutorial 
                           WHERE id_usuario = ? AND id_tutorial = ?`;
    const checkResult = await Database.executeQuery(checkQuery, [id_usuario, id_tutorial]);

    if (Array.isArray(checkResult) && checkResult.length > 0) {
      // Actualizar si ya existe
      const updateQuery = `UPDATE usuario_tutorial 
                               SET visto = true, fecha_visto = NOW() 
                               WHERE id_usuario = ? AND id_tutorial = ?`;
      return await Database.executeQuery(updateQuery, [id_usuario, id_tutorial]);
    } else {
      // Insertar nuevo registro
      const insertQuery = `INSERT INTO usuario_tutorial (id_usuario, id_tutorial, visto, fecha_visto) 
                               VALUES (?, ?, true, NOW())`;
      return await Database.executeQuery(insertQuery, [id_usuario, id_tutorial]);
    }
  }

  public async obtenerTutorialesVistos(): Promise<any[]> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT t.* 
                       FROM TUTORIAL t 
                       JOIN usuario_tutorial ut ON t.id_tutorial = ut.id_tutorial 
                       WHERE ut.id_usuario = ? AND ut.visto = true 
                       ORDER BY t.orden`;
    return await Database.executeQuery(query, [id_usuario]);
  }

  public async obtenerTutorialesPendientes(): Promise<any[]> {
    const id_usuario = AuthService.getActiveUserId();
    const query = `SELECT t.* 
                       FROM TUTORIAL t 
                       LEFT JOIN usuario_tutorial ut ON t.id_tutorial = ut.id_tutorial AND ut.id_usuario = ? 
                       WHERE ut.id_tutorial IS NULL OR ut.visto = false 
                       ORDER BY t.orden`;
    return await Database.executeQuery(query, [id_usuario]);
  }
}