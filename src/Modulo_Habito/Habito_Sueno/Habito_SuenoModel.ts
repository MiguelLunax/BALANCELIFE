// BALANCELIFE/backend/src/Modulo_Habito/Habito_Sueno/Habito_SuenoModel.ts
import Database from '../../express/Database';

export default class Habito_SuenoModel {
    public async registrarSueno(horas: number, calidad: number, fecha: string): Promise<any> {
        const query = `INSERT INTO REGISTRO_SUENO (id_usuario, fecha, horas, calidad) 
                       VALUES (?, ?, ?, ?)`;
        const params = [1, fecha, horas, calidad];
        return await Database.executeQuery(query, params);
    }

    public async obtenerRegistros(): Promise<any[]> {
        const query = `SELECT * FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? 
                       ORDER BY fecha DESC`;
        return await Database.executeQuery(query, [1]);
    }

    public async obtenerRegistroPorFecha(fecha: string): Promise<any> {
        const query = `SELECT * FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? AND fecha = ?`;
        const result = await Database.executeQuery(query, [1, fecha]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    public async actualizarRegistro(id_registro: number, horas: number, calidad: number): Promise<any> {
        
        const query = `UPDATE REGISTRO_SUENO 
                       SET horas = ?, calidad = ? 
                       WHERE id_registro_sueno = ? AND id_usuario = ?`;
        const params = [horas, calidad, id_registro, 1];
        return await Database.executeQuery(query, params);
    }

    public async eliminarRegistro(id_registro: number): Promise<any> {
        const query = `DELETE FROM REGISTRO_SUENO 
                       WHERE id_registro_sueno = ? AND id_usuario = ?`;
        return await Database.executeQuery(query, [id_registro, 1]);
    }

    public async obtenerPromedioSemanal(): Promise<number> {
        const query = `SELECT AVG(horas) as promedio 
                       FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? 
                       AND fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`;
        const result = await Database.executeQuery(query, [1]);
        return result[0].promedio || 0;
    }
}