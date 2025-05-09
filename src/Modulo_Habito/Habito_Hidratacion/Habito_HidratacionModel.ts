// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionModel.ts
import Database from '../../express/Database';

export default class Habito_HidratacionModel {
    // Registra una nueva cantidad de agua consumida usando el stored procedure
    public async registrarHidratacion(cantidad: number): Promise<void> {
        const query = `CALL RegistrarHidratacion(?, ?)`;
        const params = [1,cantidad];
        await Database.executeQuery(query, params);
    }

    // Obtiene estadísticas de hidratación por mes o año
    public async obtenerEstadisticas(mes?: number, anio: number = new Date().getFullYear()): Promise<any> {
        const query = `CALL ObtenerEstadisticasHidratacion(?, ?, ?)`;
        const params = [1, mes ?? null, anio];
        const result = await Database.executeQuery(query, params);

        return result;
    }
}