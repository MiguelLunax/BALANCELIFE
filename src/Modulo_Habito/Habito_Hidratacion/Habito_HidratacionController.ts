// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionController.ts
import { Request, Response } from 'express';
import Habito_HidratacionModel from './Habito_HidratacionModel';

export default class Habito_HidratacionController {
    constructor(private hidratacionModel: Habito_HidratacionModel) {}

    // Registrar hidratación (usa el SP)
    public registrarHidratacion = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cantidad } = req.body;
            if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
                res.status(400).json({ error: "La cantidad es obligatoria y debe ser positiva" });
                return;
            }
            await this.hidratacionModel.registrarHidratacion(cantidad);
            res.status(201).json({ message: "Hidratación registrada correctamente" });
        } catch (error) {
            console.error('Error al registrar hidratación:', error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    // Nuevo endpoint para obtener estadísticas
    public getEstadisticas = async (req: Request, res: Response): Promise<void> => {
        try {
            const { mes, anio } = req.query;
            const parsedMes = mes ? parseInt(mes as string) : undefined;
            const parsedAnio = anio ? parseInt(anio as string) : new Date().getFullYear();

            const estadisticas = await this.hidratacionModel.obtenerEstadisticas(parsedMes, parsedAnio);
            res.json({ estadisticas });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({ error: "Error al obtener estadísticas de hidratación" });
        }
    };
}