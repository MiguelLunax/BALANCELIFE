// BALANCELIFE/backend/src/Modulo_Habito/Habito_Sueno/Habito_SuenoController.ts
import { Request, Response } from 'express';
import Habito_SuenoModel from './Habito_SuenoModel';

export default class Habito_SuenoController {
    constructor(private suenoModel: Habito_SuenoModel) {}

    public registrarSueno = async (req: Request, res: Response): Promise<void> => {
        try {
            const { horas, calidad, fecha } = req.body;

            if (!horas || isNaN(horas) || horas <= 0 || horas > 24) {
                res.status(400).json({ error: "Las horas deben ser un número entre 1 y 24" });
                return;
            }

            if (!calidad || isNaN(calidad) || calidad < 1 || calidad > 5) {
                res.status(400).json({ error: "La calidad debe ser un número entre 1 y 5" });
                return;
            }

            if (!fecha) {
                res.status(400).json({ error: "La fecha es requerida" });
                return;
            }

            // Verificar si ya existe un registro para esta fecha
            const registroExistente = await this.suenoModel.obtenerRegistroPorFecha(fecha);
            if (registroExistente) {
                res.status(409).json({ error: "Ya existe un registro para esta fecha" });
                return;
            }

            await this.suenoModel.registrarSueno(horas, calidad, fecha);
            res.status(201).json({ message: "Registro de sueño guardado correctamente" });
        } catch (error) {
            console.error('Error al registrar sueño:', error);
            res.status(500).json({ error: "Error al registrar sueño" });
        }
    };

    public obtenerRegistros = async (_req: Request, res: Response): Promise<void> => {
        try {
            const registros = await this.suenoModel.obtenerRegistros();
            res.json(registros);
        } catch (error) {
            console.error('Error al obtener registros de sueño:', error);
            res.status(500).json({ error: "Error al obtener registros de sueño" });
        }
    };

    public actualizarRegistro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_registro, horas, calidad } = req.body;

            if (!id_registro) {
                res.status(400).json({ error: "ID de registro es requerido" });
                return;
            }

            if (!horas || isNaN(horas) || horas <= 0 || horas > 24) {
                res.status(400).json({ error: "Las horas deben ser un número entre 1 y 24" });
                return;
            }

            if (!calidad || isNaN(calidad) || calidad < 1 || calidad > 5) {
                res.status(400).json({ error: "La calidad debe ser un número entre 1 y 5" });
                return;
            }

            await this.suenoModel.actualizarRegistro(id_registro, horas, calidad);
            res.json({ message: "Registro actualizado correctamente" });
        } catch (error) {
            console.error('Error al actualizar registro de sueño:', error);
            res.status(500).json({ error: "Error al actualizar registro de sueño" });
        }
    };

    public eliminarRegistro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_registro } = req.params;
            
            if (!id_registro) {
                res.status(400).json({ error: "ID de registro es requerido" });
                return;
            }
            
            await this.suenoModel.eliminarRegistro(parseInt(id_registro));
            res.json({ message: "Registro eliminado correctamente" });
        } catch (error) {
            console.error('Error al eliminar registro de sueño:', error);
            res.status(500).json({ error: "Error al eliminar registro de sueño" });
        }
    };

    public obtenerPromedioSemanal = async (_req: Request, res: Response): Promise<void> => {
        try {
            const promedio = await this.suenoModel.obtenerPromedioSemanal();
            res.json({ promedio });
        } catch (error) {
            console.error('Error al obtener promedio semanal de sueño:', error);
            res.status(500).json({ error: "Error al obtener promedio semanal de sueño" });
        }
    };
}