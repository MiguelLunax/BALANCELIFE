// BALANCELIFE/backend/src/Modulo_Estadistica/EstadisticaModel.ts
import Database from '../express/Database';

export default class EstadisticaModel {
    public async obtenerEstadisticasHidratacion(periodo: string): Promise<any[]> {
        let query = '';
        
        switch (periodo) {
            case 'dia':
                query = `
                    SELECT DATE_FORMAT(fecha_hora, '%H:00') as hora, SUM(cantidad_ml) as total
                    FROM REGISTRO_HIDRATACION
                    WHERE id_usuario = ? AND DATE(fecha_hora) = CURDATE()
                    GROUP BY DATE_FORMAT(fecha_hora, '%H:00')
                    ORDER BY hora
                `;
                break;
            case 'semana':
                query = `
                    SELECT DATE_FORMAT(fecha_hora, '%W') as dia, SUM(cantidad_ml) as total
                    FROM REGISTRO_HIDRATACION
                    WHERE id_usuario = ? AND fecha_hora >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                    GROUP BY DATE_FORMAT(fecha_hora, '%W')
                    ORDER BY DAYOFWEEK(fecha_hora)
                `;
                break;
            case 'mes':
                query = `
                    SELECT DATE_FORMAT(fecha_hora, '%d') as dia, SUM(cantidad_ml) as total
                    FROM REGISTRO_HIDRATACION
                    WHERE id_usuario = ? AND fecha_hora >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    GROUP BY DATE_FORMAT(fecha_hora, '%d')
                    ORDER BY dia
                `;
                break;
            default:
                query = `
                    SELECT DATE_FORMAT(fecha_hora, '%Y-%m-%d') as fecha, SUM(cantidad_ml) as total
                    FROM REGISTRO_HIDRATACION
                    WHERE id_usuario = ?
                    GROUP BY DATE_FORMAT(fecha_hora, '%Y-%m-%d')
                    ORDER BY fecha DESC
                    LIMIT 30
                `;
        }
        
        return await Database.executeQuery(query, [1]);
    }

    public async obtenerEstadisticasSueno(periodo: string): Promise<any[]> {
        let query = '';
        
        switch (periodo) {
            case 'semana':
                query = `
                    SELECT DATE_FORMAT(fecha, '%W') as dia, AVG(horas) as promedio
                    FROM REGISTRO_SUENO
                    WHERE id_usuario = ? AND fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                    GROUP BY DATE_FORMAT(fecha, '%W')
                    ORDER BY DAYOFWEEK(fecha)
                `;
                break;
            case 'mes':
                query = `
                    SELECT DATE_FORMAT(fecha, '%d') as dia, AVG(horas) as promedio
                    FROM REGISTRO_SUENO
                    WHERE id_usuario = ? AND fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    GROUP BY DATE_FORMAT(fecha, '%d')
                    ORDER BY dia
                `;
                break;
            default:
                query = `
                    SELECT DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, horas
                    FROM REGISTRO_SUENO
                    WHERE id_usuario = ?
                    ORDER BY fecha DESC
                    LIMIT 30
                `;
        }
        
        return await Database.executeQuery(query, [1]);
    }

    public async obtenerEstadisticasActividad(periodo: string): Promise<any[]> {
        let query = '';
        
        switch (periodo) {
            case 'semana':
                query = `
                    SELECT DATE_FORMAT(fecha, '%W') as dia, SUM(duracion_minutos) as total
                    FROM REGISTRO_ACTIVIDAD
                    WHERE id_usuario = ? AND fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                    GROUP BY DATE_FORMAT(fecha, '%W')
                    ORDER BY DAYOFWEEK(fecha)
                `;
                break;
            case 'mes':
                query = `
                    SELECT DATE_FORMAT(fecha, '%d') as dia, SUM(duracion_minutos) as total
                    FROM REGISTRO_ACTIVIDAD
                    WHERE id_usuario = ? AND fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    GROUP BY DATE_FORMAT(fecha, '%d')
                    ORDER BY dia
                `;
                break;
            default:
                query = `
                    SELECT DATE_FORMAT(fecha, '%Y-%m-%d') as fecha, SUM(duracion_minutos) as total
                    FROM REGISTRO_ACTIVIDAD
                    WHERE id_usuario = ?
                    GROUP BY DATE_FORMAT(fecha, '%Y-%m-%d')
                    ORDER BY fecha DESC
                    LIMIT 30
                `;
        }
        
        return await Database.executeQuery(query, [1]);
    }

    public async obtenerResumenGeneral(): Promise<any> {
        
        // Obtener promedio diario de agua
        const aguaQuery = `
            SELECT AVG(total) as promedio_agua
            FROM (
                SELECT DATE(fecha_hora) as fecha, SUM(cantidad_ml) as total
                FROM REGISTRO_HIDRATACION
                WHERE id_usuario = ?
                GROUP BY DATE(fecha_hora)
            ) as agua_diaria
        `;
        
        // Obtener promedio de horas de sueño
        const suenoQuery = `
            SELECT AVG(horas) as promedio_sueno
            FROM REGISTRO_SUENO
            WHERE id_usuario = ?
        `;
        
        // Obtener promedio de minutos de actividad física
        const actividadQuery = `
            SELECT AVG(total) as promedio_actividad
            FROM (
                SELECT DATE(fecha) as fecha, SUM(duracion_minutos) as total
                FROM REGISTRO_ACTIVIDAD
                WHERE id_usuario = ?
                GROUP BY DATE(fecha)
            ) as actividad_diaria
        `;
        
        // Obtener total de desafíos completados
        const desafiosQuery = `
            SELECT COUNT(*) as total_desafios
            FROM usuario_desafio
            WHERE id_usuario = ? AND estado = 'Completado'
        `;
        
        const [aguaResult, suenoResult, actividadResult, desafiosResult] = await Promise.all([
            Database.executeQuery(aguaQuery, [1]),
            Database.executeQuery(suenoQuery, [1]),
            Database.executeQuery(actividadQuery, [1]),
            Database.executeQuery(desafiosQuery, [1])
        ]);
        
        return {
            promedio_agua: aguaResult[0].promedio_agua || 0,
            promedio_sueno: suenoResult[0].promedio_sueno || 0,
            promedio_actividad: actividadResult[0].promedio_actividad || 0,
            total_desafios: desafiosResult[0].total_desafios || 0
        };
    }
}