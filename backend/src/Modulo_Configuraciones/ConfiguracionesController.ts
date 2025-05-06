import { Request, Response } from 'express';
import ConfiguracionesModel from './ConfiguracionesModel';

export default class ConfiguracionesController {
    constructor(private configuracionesModel: ConfiguracionesModel) {}

    public obtenerConfiguraciones = async (req: Request, res: Response): Promise<void> => {
        try {
            const id_usuario = parseInt(req.params['id_usuario'] || '0');
            if (isNaN(id_usuario) || id_usuario <= 0) {
                res.status(400).json({ error: 'ID de usuario inválido' });
                return;
            }
            const configuraciones = await this.configuracionesModel.obtenerConfiguraciones(id_usuario);

            if (configuraciones) {
                res.json(configuraciones);
            } else {
                res.json({
                    notificaciones_activas: true,
                    tema_oscuro: false,
                    idioma: 'es',
                    volumen_sonido: 80
                });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener configuraciones' });
        }
    };

    public guardarConfiguraciones = async (req: Request, res: Response): Promise<void> => {
        try {
            const id_usuario = parseInt(req.params["id_usuario"] || '0');
            const configuraciones = req.body;

            if (
                configuraciones.notificaciones_activas === undefined ||
                configuraciones.tema_oscuro === undefined ||
                !configuraciones.idioma ||
                configuraciones.volumen_sonido === undefined
            ) {
                res.status(400).json({ error: 'Todos los campos son requeridos' });
                return;
            }

            await this.configuracionesModel.guardarConfiguraciones(id_usuario, configuraciones);
            res.json({ message: 'Configuraciones guardadas correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar configuraciones' });
        }
    };

    public restablecerConfiguracionesPorDefecto = async (req: Request, res: Response): Promise<void> => {
        try {
            const id_usuario = parseInt(req.params["id_usuario"] || '0');
            await this.configuracionesModel.restablecerConfiguracionesPorDefecto(id_usuario);

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
            res.status(500).json({ error: 'Error al restablecer configuraciones' });
        }
    };
}
