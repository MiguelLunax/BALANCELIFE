// BALANCELIFE/backend/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionModel.ts
import Database from '../../express/Database';
import AuthService from '../../services/AuthService';
import RegisterAgua from '../../Types/RegisterAgua';

export default class Habito_HidratacionModel {
    public async registrarHidratacion(cantidad: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const fecha_hora = new Date();
        const tipo_bebida = 'agua'; // Valor por defecto

        const query = `INSERT INTO REGISTRO_HIDRATACION (id_usuario, fecha_hora, cantidad_ml, tipo_bebida) 
                       VALUES (?, ?, ?, ?)`;
        const params = [id_usuario, fecha_hora, cantidad, tipo_bebida];
        return await Database.executeQuery(query, params);
    }

    public async obtenerRegistros(): Promise<RegisterAgua[]> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `SELECT * FROM REGISTRO_HIDRATACION 
                       WHERE id_usuario = ? 
                       ORDER BY fecha_hora DESC`;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async obtenerTotalDiario(fecha?: string): Promise<number> {
        const id_usuario = AuthService.getActiveUserId();
        let fechaConsulta = fecha || new Date().toISOString().split('T')[0];
        
        const query = `SELECT SUM(cantidad_ml) as total 
                       FROM REGISTRO_HIDRATACION 
                       WHERE id_usuario = ? 
                       AND DATE(fecha_hora) = ?`;
        const result = await Database.executeQuery(query, [id_usuario, fechaConsulta]);
        return result[0].total || 0;
    }

    public async eliminarRegistro(id_registro: number): Promise<any> {
        const id_usuario = AuthService.getActiveUserId();
        const query = `DELETE FROM REGISTRO_HIDRATACION 
                       WHERE id_registro_hidratacion = ? AND id_usuario = ?`;
        return await Database.executeQuery(query, [id_registro, id_usuario]);
    }
}