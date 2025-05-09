// BALANCELIFE/backend/src/Modulo_Desafio/DesafioController.ts
import { Request, Response } from 'express';
import DesafioModel from './DesafioModel';
import Desafio from '../Types/Desafio';

export default class DesafioController {
    constructor(private desafioModel: DesafioModel) {}

    public añadirDesafio = async (req: Request, res: Response): Promise<void> => {
        try {
            const desafio: Desafio = req.body;
            
            // Validar datos requeridos
            if (!desafio.nombre || !desafio.descripcion || !desafio.tipo) {
                res.status(400).json({ error: 'Nombre, descripción y tipo son obligatorios' });
                return;
            }
            
            await this.desafioModel.añadirDesafio(desafio);
            res.status(201).json({ message: 'Desafío añadido correctamente' });
        } catch (error) {
            console.error('Error al añadir desafío:', error);
            res.status(500).json({ error: 'Error al añadir desafío' });
        }
    };

    public getDesafios = async (_req: Request, res: Response): Promise<void> => {
        try {
            const desafios = await this.desafioModel.obtenerDesafios();
            res.json(desafios);
        } catch (error) {
            console.error('Error al obtener desafíos:', error);
            res.status(500).json({ error: 'Error al obtener desafíos' });
        }
    };

    public getDesafiosUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            const desafios = await this.desafioModel.obtenerDesafiosUsuario(parseInt(id_usuario));
            res.json(desafios);
        } catch (error) {
            console.error('Error al obtener desafíos del usuario:', error);
            res.status(500).json({ error: 'Error al obtener desafíos del usuario' });
        }
    };

    public aceptarDesafio = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_desafio } = req.body;
            
            if (!id_desafio) {
                res.status(400).json({ error: 'ID de desafío es requerido' });
                return;
            }
            
            await this.desafioModel.aceptarDesafio(id_desafio);
            res.status(201).json({ message: 'Desafío aceptado correctamente' });
        } catch (error) {
            console.error('Error al aceptar desafío:', error);
            res.status(500).json({ error: 'Error al aceptar desafío' });
        }
    };

    public registrarProgreso = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_desafio, progreso } = req.body;
            
            if (!id_desafio || !progreso) {
                res.status(400).json({ error: 'ID de desafío y progreso son requeridos' });
                return;
            }
            
            await this.desafioModel.registrarProgreso(id_desafio, progreso);
            res.json({ message: 'Progreso registrado correctamente' });
        } catch (error) {
            console.error('Error al registrar progreso:', error);
            res.status(500).json({ error: 'Error al registrar progreso' });
        }
    };

    public completarDesafio = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_desafio } = req.body;
            
            if (!id_desafio) {
                res.status(400).json({ error: 'ID de desafío es requerido' });
                return;
            }
            
            await this.desafioModel.completarDesafio(id_desafio);
            res.json({ message: 'Desafío completado correctamente' });
        } catch (error) {
            console.error('Error al completar desafío:', error);
            res.status(500).json({ error: 'Error al completar desafío' });
        }
    };

    public isNull = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_desafio } = req.params;
            
            if (!id_desafio) {
                res.status(400).json({ error: 'ID de desafío es requerido' });
                return;
            }
            
            const result = await this.desafioModel.isNull(parseInt(id_desafio));
            res.json({ isNull: result });
        } catch (error) {
            console.error('Error al verificar desafío:', error);
            res.status(500).json({ error: 'Error al verificar desafío' });
        }
    };

    public puntosGanados = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            const totalPuntos = await this.desafioModel.puntosGanados(parseInt(id_usuario));
            res.json({ totalPuntos });
        } catch (error) {
            console.error('Error al obtener puntos ganados:', error);
            res.status(500).json({ error: 'Error al obtener puntos ganados' });
        }
    };
}