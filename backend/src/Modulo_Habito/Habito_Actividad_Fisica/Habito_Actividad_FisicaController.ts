// BALANCELIFE/backend/src/Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaController.ts
import { Request, Response } from 'express';
import Habito_Actividad_FisicaModel from './Habito_Actividad_FisicaModel';

export default class Habito_Actividad_FisicaController {
    constructor(private actividadModel: Habito_Actividad_FisicaModel) {}

    public registrarActividad = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tipo, duracion_minutos, intensidad, fecha } = req.body;

            if (!tipo) {
                res.status(400).json({ error: "El tipo de actividad es requerido" });
                return;
            }

            if (!duracion_minutos || isNaN(duracion_minutos) || duracion_minutos <= 0) {
                res.status(400).json({ error: "La duración debe ser un número positivo" });
                return;
            }

            if (!intensidad) {
                res.status(400).json({ error: "La intensidad es requerida" });
                return;
            }

            if (!fecha) {
                res.status(400).json({ error: "La fecha es requerida" });
                return;
            }

            await this.actividadModel.registrarActividad(tipo, duracion_minutos, intensidad, fecha);
            res.status(201).json({ message: "Actividad física registrada correctamente" });
        } catch (error) {
            console.error('Error al registrar actividad física:', error);
            res.status(500).json({ error: "Error al registrar actividad física" });
        }
    };

    public obtenerRegistros = async (_req: Request, res: Response): Promise<void> => {
        try {
            const registros = await this.actividadModel.obtenerRegistros();
            res.json(registros);
        } catch (error) {
            console.error('Error al obtener registros de actividad física:', error);
            res.status(500).json({ error: "Error al obtener registros de actividad física" });
        }
    };

    public obtenerTiposActividad = async (_req: Request, res: Response): Promise<void> => {
        try {
            const tipos = await this.actividadModel.obtenerTiposActividad();
            res.json(tipos);
        } catch (error) {
            console.error('Error al obtener tipos de actividad:', error);
            res.status(500).json({ error: "Error al obtener tipos de actividad" });
        }
    };

    public actualizarRegistro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_registro, tipo, duracion_minutos, intensidad } = req.body;

            if (!id_registro) {
                res.status(400).json({ error: "ID de registro es requerido" });
                return;
            }

            if (!tipo) {
                res.status(400).json({ error: "El tipo de actividad es requerido" });
                return;
            }

            if (!duracion_minutos || isNaN(duracion_minutos) || duracion_minutos <= 0) {
                res.status(400).json({ error: "La duración debe ser un número positivo" });
                return;
            }

            if (!intensidad) {
                res.status(400).json({ error: "La intensidad es requerida" });
                return;
            }

            await this.actividadModel.actualizarRegistro(id_registro, tipo, duracion_minutos, intensidad);
            res.json({ message: "Registro actualizado correctamente" });
        } catch (error) {
            console.error('Error al actualizar registro de actividad física:', error);
            res.status(500).json({ error: "Error al actualizar registro de actividad física" });
        }
    };

    public eliminarRegistro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_registro } = req.params;
            
            if (!id_registro) {
                res.status(400).json({ error: "ID de registro es requerido" });
                return;
            }
            
            await this.actividadModel.eliminarRegistro(parseInt(id_registro));
            res.json({ message: "Registro eliminado correctamente" });
        } catch (error) {
            console.error('Error al eliminar registro de actividad física:', error);
            res.status(500).json({ error: "Error al eliminar registro de actividad física" });
        }
    };

    public obtenerEstadisticasPorTipo = async (_req: Request, res: Response): Promise<void> => {
        try {
            const estadisticas = await this.actividadModel.obtenerEstadisticasPorTipo();
            res.json(estadisticas);
        } catch (error) {
            console.error('Error al obtener estadísticas por tipo:', error);
            res.status(500).json({ error: "Error al obtener estadísticas por tipo" });
        }
    };
}