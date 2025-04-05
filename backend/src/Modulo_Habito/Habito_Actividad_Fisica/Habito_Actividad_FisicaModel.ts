// BALANCELIFE/backend/src/Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaModel.ts
import Database from '../../express/Database';
import AuthService from '../../services/AuthService';

export default class Habito_Actividad_FisicaModel {
    public async registrarActividad(tipo: string, duracion_minutos: number, intensidad: string, fecha: string): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `INSERT INTO REGISTRO_ACTIVIDAD (id_usuario, tipo, duracion_minutos, intensidad, fecha) 
                       VALUES (?, ?, ?, ?, ?)`;
        const params = [id_usuario, tipo, duracion_minutos, intensidad, fecha];
        return await Database.executeQuery(query, params);
    }

    public async obtenerRegistros(): Promise<any[]> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT * FROM REGISTRO_ACTIVIDAD 
                       WHERE id_usuario = ? 
                       ORDER BY fecha DESC`;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async obtenerTiposActividad(): Promise<any[]> {
        const query = `SELECT DISTINCT tipo FROM REGISTRO_ACTIVIDAD ORDER BY tipo`;
        return await Database.executeQuery(query);
    }

    public async actualizarRegistro(id_registro: number, tipo: string, duracion_minutos: number, intensidad: string): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `UPDATE REGISTRO_ACTIVIDAD 
                       SET tipo = ?, duracion_minutos = ?, intensidad = ? 
                       WHERE id_registro_actividad = ? AND id_usuario = ?`;
        const params = [tipo, duracion_minutos, intensidad, id_registro, id_usuario];
        return await Database.executeQuery(query, params);
    }

    public async eliminarRegistro(id_registro: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `DELETE FROM REGISTRO_ACTIVIDAD 
                       WHERE id_registro_actividad = ? AND id_usuario = ?`;
        return await Database.executeQuery(query, [id_registro, id_usuario]);
    }

    public async obtenerEstadisticasPorTipo(): Promise<any[]> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT tipo, SUM(duracion_minutos) as total_minutos, COUNT(*) as total_sesiones
                       FROM REGISTRO_ACTIVIDAD 
                       WHERE id_usuario = ? 
                       GROUP BY tipo 
                       ORDER BY total_minutos DESC`;
        return await Database.executeQuery(query, [id_usuario]);
    }
}