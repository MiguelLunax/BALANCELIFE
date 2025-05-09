// BALANCELIFE/backend/src/Modulo_Estadistica/EstadisticaController.ts
import { Request, Response } from 'express';
import EstadisticaModel from './EstadisticaModel';

export default class EstadisticaController {
    constructor(private estadisticaModel: EstadisticaModel) {}

    public obtenerEstadisticasHidratacion = async (req: Request, res: Response): Promise<void> => {
        try {
            const { periodo = 'semana' } = req.query;
            const estadisticas = await this.estadisticaModel.obtenerEstadisticasHidratacion(periodo as string);
            res.json(estadisticas);
        } catch (error) {
            console.error('Error al obtener estadísticas de hidratación:', error);
            res.status(500).json({ error: 'Error al obtener estadísticas de hidratación' });
        }
    };

    public obtenerEstadisticasSueno = async (req: Request, res: Response): Promise<void> => {
        try {
            const { periodo = 'semana' } = req.query;
            const estadisticas = await this.estadisticaModel.obtenerEstadisticasSueno(periodo as string);
            res.json(estadisticas);
        } catch (error) {
            console.error('Error al obtener estadísticas de sueño:', error);
            res.status(500).json({ error: 'Error al obtener estadísticas de sueño' });
        }
    };

    public obtenerEstadisticasActividad = async (req: Request, res: Response): Promise<void> => {
        try {
            const { periodo = 'semana' } = req.query;
            const estadisticas = await this.estadisticaModel.obtenerEstadisticasActividad(periodo as string);
            res.json(estadisticas);
        } catch (error) {
            console.error('Error al obtener estadísticas de actividad física:', error);
            res.status(500).json({ error: 'Error al obtener estadísticas de actividad física' });
        }
    };

    public obtenerResumenGeneral = async (_req: Request, res: Response): Promise<void> => {
        try {
            const resumen = await this.estadisticaModel.obtenerResumenGeneral();
            res.json(resumen);
        } catch (error) {
            console.error('Error al obtener resumen general:', error);
            res.status(500).json({ error: 'Error al obtener resumen general' });
        }
    };
}