import Database from '../express/Database';

export default class ConfiguracionesModel {
    public async obtenerConfiguraciones(id_usuario: number): Promise<any> {
        const query = `SELECT notificaciones_activas, tema_oscuro, idioma, volumen_sonido 
                       FROM CONFIGURACIONES 
                       WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    
    public async guardarConfiguraciones(id_usuario: number, configuraciones: any): Promise<any> {
        const existeQuery = `SELECT COUNT(*) as count FROM CONFIGURACIONES WHERE id_usuario = ?`;
        const existeResult = await Database.executeQuery(existeQuery, [id_usuario]);
        const existe = existeResult[0].count > 0;

        if (existe) {
            const query = `UPDATE CONFIGURACIONES 
                           SET notificaciones_activas = ?, tema_oscuro = ?, idioma = ?, volumen_sonido = ? 
                           WHERE id_usuario = ?`;
            const params = [
                configuraciones.notificaciones_activas,
                configuraciones.tema_oscuro,
                configuraciones.idioma,
                configuraciones.volumen_sonido,
                id_usuario
            ];
            return await Database.executeQuery(query, params);
        } else {
            const query = `INSERT INTO CONFIGURACIONES (id_usuario, notificaciones_activas, tema_oscuro, idioma, volumen_sonido) 
                           VALUES (?, ?, ?, ?, ?)`;
            const params = [
                id_usuario,
                configuraciones.notificaciones_activas,
                configuraciones.tema_oscuro,
                configuraciones.idioma,
                configuraciones.volumen_sonido
            ];
            return await Database.executeQuery(query, params);
        }
    }

    public async restablecerConfiguracionesPorDefecto(id_usuario: number): Promise<any> {
        const query = `UPDATE CONFIGURACIONES 
                       SET notificaciones_activas = true, tema_oscuro = false, idioma = 'es', volumen_sonido = 80 
                       WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [id_usuario]);
    }
}
