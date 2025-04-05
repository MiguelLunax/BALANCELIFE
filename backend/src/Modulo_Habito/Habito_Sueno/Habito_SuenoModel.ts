// BALANCELIFE/backend/src/Modulo_Habito/Habito_Sueno/Habito_SuenoModel.ts
import Database from '../../express/Database';
import AuthService from '../../services/AuthService';

export default class Habito_SuenoModel {
    public async registrarSueno(horas: number, calidad: number, fecha: string): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `INSERT INTO REGISTRO_SUENO (id_usuario, fecha, horas, calidad) 
                       VALUES (?, ?, ?, ?)`;
        const params = [id_usuario, fecha, horas, calidad];
        return await Database.executeQuery(query, params);
    }

    public async obtenerRegistros(): Promise<any[]> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT * FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? 
                       ORDER BY fecha DESC`;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async obtenerRegistroPorFecha(fecha: string): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT * FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? AND fecha = ?`;
        const result = await Database.executeQuery(query, [id_usuario, fecha]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    public async actualizarRegistro(id_registro: number, horas: number, calidad: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `UPDATE REGISTRO_SUENO 
                       SET horas = ?, calidad = ? 
                       WHERE id_registro_sueno = ? AND id_usuario = ?`;
        const params = [horas, calidad, id_registro, id_usuario];
        return await Database.executeQuery(query, params);
    }

    public async eliminarRegistro(id_registro: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `DELETE FROM REGISTRO_SUENO 
                       WHERE id_registro_sueno = ? AND id_usuario = ?`;
        return await Database.executeQuery(query, [id_registro, id_usuario]);
    }

    public async obtenerPromedioSemanal(): Promise<number> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT AVG(horas) as promedio 
                       FROM REGISTRO_SUENO 
                       WHERE id_usuario = ? 
                       AND fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return result[0].promedio || 0;
    }
}