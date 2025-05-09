// BALANCELIFE/backend/src/Modulo_Logro/LogroModel.ts
import Database from '../express/Database';
import Logro from '../Types/Logro';
import AuthService from '../services/AuthService';

export default class LogroModel {
    public async obtenerLogros(): Promise<Logro[]> {
        const query = `SELECT * FROM LOGRO`;
        return await Database.executeQuery(query);
    }

    public async obtenerLogrosUsuario(): Promise<any[]> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `
            SELECT l.*, ul.fecha_desbloqueo, ul.estado
            FROM LOGRO l
            LEFT JOIN usuario_logro ul ON l.id_logro = ul.id_logro AND ul.id_usuario = ?
        `;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async desbloquearLogro(id_logro: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        
        // Verificar si ya existe el registro
        const checkQuery = `
            SELECT * FROM usuario_logro 
            WHERE id_usuario = ? AND id_logro = ?
        `;
        const checkResult = await Database.executeQuery(checkQuery, [id_usuario, id_logro]);
        
        if (Array.isArray(checkResult) && checkResult.length > 0) {
            // Actualizar si ya existe
            const updateQuery = `
                UPDATE usuario_logro 
                SET estado = true, fecha_desbloqueo = NOW() 
                WHERE id_usuario = ? AND id_logro = ?
            `;
            return await Database.executeQuery(updateQuery, [id_usuario, id_logro]);
        } else {
            // Insertar nuevo registro
            const insertQuery = `
                INSERT INTO usuario_logro (id_usuario, id_logro, fecha_desbloqueo, estado) 
                VALUES (?, ?, NOW(), true)
            `;
            return await Database.executeQuery(insertQuery, [id_usuario, id_logro]);
        }
    }

    public async crearLogro(logro: Logro): Promise<any> {
        const query = `
            INSERT INTO LOGRO (nombre, descripcion, puntos_ganados) 
            VALUES (?, ?, ?)
        `;
        const params = [logro.nombre, logro.descripcion, logro.puntos_ganados];
        return await Database.executeQuery(query, params);
    }

    public async verificarLogrosHidratacion(): Promise<number[]> {
        const id_usuario = AuthService.getActiveUserId();
        const logrosDesbloqueados: number[] = [];
        
        // Verificar logro: Beber agua 7 días consecutivos
        const consecutivosQuery = `
            SELECT COUNT(DISTINCT DATE(fecha_hora)) as dias_consecutivos
            FROM REGISTRO_HIDRATACION
            WHERE id_usuario = ?
            AND fecha_hora >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        `;
        const consecutivosResult = await Database.executeQuery(consecutivosQuery, [id_usuario]);
        
        if (consecutivosResult[0].dias_consecutivos >= 7) {
            // ID del logro "Hidratación constante"
            const idLogro = 1; // Ajustar según la base de datos
            await this.desbloquearLogro(idLogro);
            logrosDesbloqueados.push(idLogro);
        }
        
        // Verificar logro: Alcanzar meta diaria de agua 30 veces
        const metaDiariaQuery = `
            SELECT u.meta_diaria_agua, COUNT(DISTINCT DATE(rh.fecha_hora)) as dias_meta_alcanzada
            FROM USUARIO u
            JOIN (
                SELECT id_usuario, fecha_hora, SUM(cantidad_ml) as total_diario
                FROM REGISTRO_HIDRATACION
                WHERE id_usuario = ?
                GROUP BY DATE(fecha_hora)
            ) as rh ON u.id_usuario = rh.id_usuario AND rh.total_diario >= u.meta_diaria_agua * 1000
            WHERE u.id_usuario = ?
        `;
        const metaDiariaResult = await Database.executeQuery(metaDiariaQuery, [id_usuario, id_usuario]);
        
        if (metaDiariaResult.length > 0 && metaDiariaResult[0].dias_meta_alcanzada >= 30) {
            // ID del logro "Maestro de la hidratación"
            const idLogro = 2; // Ajustar según la base de datos
            await this.desbloquearLogro(idLogro);
            logrosDesbloqueados.push(idLogro);
        }
        
        return logrosDesbloqueados;
    }
}