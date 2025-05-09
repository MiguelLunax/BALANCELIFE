// BALANCELIFE/backend/src/Modulo_Informacion/InformacionModel.ts
import Database from '../express/Database';

export default class InformacionModel {
  public async obtenerArticulos(): Promise<any[]> {
    const query = `SELECT * FROM ARTICULO ORDER BY fecha_publicacion DESC`;
    return await Database.executeQuery(query);
  }

  public async obtenerArticuloPorId(id_articulo: number): Promise<any> {
    const query = `SELECT * FROM ARTICULO WHERE id_articulo = ?`;
    const result = await Database.executeQuery(query, [id_articulo]);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }

  public async obtenerArticulosPorCategoria(categoria: string): Promise<any[]> {
    const query = `SELECT * FROM ARTICULO WHERE categoria = ? ORDER BY fecha_publicacion DESC`;
    return await Database.executeQuery(query, [categoria]);
  }

  public async marcarArticuloComoLeido(id_articulo: number): Promise<any> {
    // Verificar si ya existe el registro
    const checkQuery = `SELECT * FROM usuario_articulo 
                           WHERE id_usuario = ? AND id_articulo = ?`;
    const checkResult = await Database.executeQuery(checkQuery, [1, id_articulo]);

    if (Array.isArray(checkResult) && checkResult.length > 0) {
      // Actualizar si ya existe
      const updateQuery = `UPDATE usuario_articulo 
                               SET leido = true, fecha_lectura = NOW() 
                               WHERE id_usuario = ? AND id_articulo = ?`;
      return await Database.executeQuery(updateQuery, [1, id_articulo]);
    } else {
      // Insertar nuevo registro
      const insertQuery = `INSERT INTO usuario_articulo (id_usuario, id_articulo, leido, fecha_lectura) 
                               VALUES (?, ?, true, NOW())`;
      return await Database.executeQuery(insertQuery, [1, id_articulo]);
    }
  }

  public async obtenerArticulosLeidos(): Promise<any[]> {
    const query = `SELECT a.* 
                       FROM ARTICULO a 
                       JOIN usuario_articulo ua ON a.id_articulo = ua.id_articulo 
                       WHERE ua.id_usuario = ? AND ua.leido = true 
                       ORDER BY a.fecha_publicacion DESC`;
    return await Database.executeQuery(query, [1]);
  }
}