// BALANCELIFE/backend/src/Modulo_Desafio/DesafioModel.ts
import Database from '../express/Database';
import Desafio from '../Types/Desafio';

export default class DesafioModel {
    
    public async añadirDesafio(desafio: Desafio): Promise<any> {
        const query = `INSERT INTO DESAFIO (nombre, descripcion, tipo, duracion_dias, puntos_recompensa, fecha_inicio, fecha_fin) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;        
        const params = [
            desafio.nombre,
            desafio.descripcion,
            desafio.tipo,
            desafio.duracion_dias,
            desafio.puntos_recompensa,
            desafio.fecha_inicio,
            desafio.fecha_fin
        ];
        return await Database.executeQuery(query, params);
    }
    
    public async obtenerDesafios(): Promise<Desafio[]> {
        const query = `SELECT * FROM DESAFIO`;
        return await Database.executeQuery(query);
    }

    public async obtenerDesafiosUsuario(id_usuario: number): Promise<any[]> {
        const query = `
            SELECT d.*, ud.estado, ud.progreso, ud.fecha_aceptacion, ud.fecha_completado 
            FROM DESAFIO d
            JOIN usuario_desafio ud ON d.id_desafio = ud.id_desafio
            WHERE ud.id_usuario = ?
        `;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async aceptarDesafio(id_desafio: number): Promise<any> {
        const query = `INSERT INTO usuario_desafio (id_usuario, id_desafio, estado, fecha_aceptacion) 
                       VALUES (?, ?, 'En progreso', NOW())`;
        return await Database.executeQuery(query, [1, id_desafio]);
    }

    public async registrarProgreso(id_desafio: number, progreso: string): Promise<any> {
        const query = `UPDATE usuario_desafio SET progreso = ? WHERE id_usuario = ? AND id_desafio = ?`;
        return await Database.executeQuery(query, [progreso, 1, id_desafio]);
    }

    public async completarDesafio(id_desafio: number): Promise<any> {
        const query = `UPDATE usuario_desafio SET estado = 'Completado', fecha_completado = NOW() 
                       WHERE id_usuario = ? AND id_desafio = ?`;
        return await Database.executeQuery(query, [1, id_desafio]);
    }

    public async isNull(id_desafio: number): Promise<boolean> {
        const query = `SELECT COUNT(*) as count FROM DESAFIO WHERE id_desafio = ?`;
        const result = await Database.executeQuery(query, [id_desafio]);
        return result[0].count === 0;
    }

    public async puntosGanados(id_usuario: number): Promise<number> {
        const query = `SELECT SUM(d.puntos_recompensa) as total_puntos 
                       FROM usuario_desafio ud 
                       JOIN DESAFIO d ON ud.id_desafio = d.id_desafio 
                       WHERE ud.id_usuario = ? AND ud.estado = 'Completado'`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return result[0].total_puntos || 0;
    }
}