// BALANCELIFE/backend/src/Modulo_Configuraciones/ConfiguracionesController.ts
import { Request, Response } from 'express';
import ConfiguracionesModel from './ConfiguracionesModel';

export default class ConfiguracionesController {
    constructor(private configuracionesModel: ConfiguracionesModel) {}

    public obtenerConfiguraciones = async (_req: Request, res: Response): Promise<void> => {
        try {
            const configuraciones = await this.configuracionesModel.obtenerConfiguraciones();
            
            if (configuraciones) {
                res.json(configuraciones);
            } else {
                // Si no hay configuraciones, devolver valores por defecto
                res.json({
                    notificaciones_activas: true,
                    tema_oscuro: false,
                    idioma: 'es',
                    volumen_sonido: 80
                });
            }
        } catch (error) {
            console.error('Error al obtener configuraciones:', error);
            res.status(500).json({ error: 'Error al obtener configuraciones' });
        }
    };

    public guardarConfiguraciones = async (req: Request, res: Response): Promise<void> => {
        try {
            const configuraciones = req.body;
            
            // Validar datos
            if (configuraciones.notificaciones_activas === undefined ||
                configuraciones.tema_oscuro === undefined ||
                !configuraciones.idioma ||
                configuraciones.volumen_sonido === undefined) {
                res.status(400).json({ error: 'Todos los campos de configuración son requeridos' });
                return;
            }
            
            await this.configuracionesModel.guardarConfiguraciones(configuraciones);
            res.json({ message: 'Configuraciones guardadas correctamente' });
        } catch (error) {
            console.error('Error al guardar configuraciones:', error);
            res.status(500).json({ error: 'Error al guardar configuraciones' });
        }
    };

    public restablecerConfiguracionesPorDefecto = async (_req: Request, res: Response): Promise<void> => {
        try {
            await this.configuracionesModel.restablecerConfiguracionesPorDefecto();
            res.json({ 
                message: 'Configuraciones restablecidas correctamente',
                configuraciones: {
                    notificaciones_activas: true,
                    tema_oscuro: false,
                    idioma: 'es',
                    volumen_sonido: 80
                }
            });
        } catch (error) {
            console.error('Error al restablecer configuraciones:', error);
            res.status(500).json({ error: 'Error al restablecer configuraciones' });
        }
    };
}