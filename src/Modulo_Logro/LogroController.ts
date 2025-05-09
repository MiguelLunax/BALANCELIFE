// BALANCELIFE/backend/src/Modulo_Logro/LogroController.ts
import { Request, Response } from 'express';
import LogroModel from './LogroModel';

export default class LogroController {
    constructor(private logroModel: LogroModel) {}

    public obtenerLogros = async (_req: Request, res: Response): Promise<void> => {
        try {
            const logros = await this.logroModel.obtenerLogros();
            res.json(logros);
        } catch (error) {
            console.error('Error al obtener logros:', error);
            res.status(500).json({ error: 'Error al obtener logros' });
        }
    };

    public obtenerLogrosUsuario = async (_req: Request, res: Response): Promise<void> => {
        try {
            const logros = await this.logroModel.obtenerLogrosUsuario();
            res.json(logros);
        } catch (error) {
            console.error('Error al obtener logros del usuario:', error);
            res.status(500).json({ error: 'Error al obtener logros del usuario' });
        }
    };

    public desbloquearLogro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_logro } = req.body;
            
            if (!id_logro) {
                res.status(400).json({ error: 'ID de logro es requerido' });
                return;
            }
            
            await this.logroModel.desbloquearLogro(id_logro);
            res.json({ message: 'Logro desbloqueado correctamente' });
        } catch (error) {
            console.error('Error al desbloquear logro:', error);
            res.status(500).json({ error: 'Error al desbloquear logro' });
        }
    };

    public crearLogro = async (req: Request, res: Response): Promise<void> => {
        try {
            const logro = req.body;
            
            if (!logro.nombre || !logro.descripcion || !logro.puntos_ganados) {
                res.status(400).json({ error: 'Nombre, descripción y puntos son requeridos' });
                return;
            }
            
            await this.logroModel.crearLogro(logro);
            res.status(201).json({ message: 'Logro creado correctamente' });
        } catch (error) {
            console.error('Error al crear logro:', error);
            res.status(500).json({ error: 'Error al crear logro' });
        }
    };

    public verificarLogrosHidratacion = async (_req: Request, res: Response): Promise<void> => {
        try {
            const logrosDesbloqueados = await this.logroModel.verificarLogrosHidratacion();
            res.json({ 
                message: 'Verificación de logros completada', 
                logrosDesbloqueados 
            });
        } catch (error) {
            console.error('Error al verificar logros de hidratación:', error);
            res.status(500).json({ error: 'Error al verificar logros de hidratación' });
        }
    };
}