// BALANCELIFE/backend/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionController.ts
import { Request, Response } from 'express';
import Habito_HidratacionModel from './Habito_HidratacionModel';

export default class Habito_HidratacionController {
    constructor(private hidratacionModel: Habito_HidratacionModel) {}

    public registrarHidratacion = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cantidad } = req.body;

            if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
                res.status(400).json({ error: "La cantidad de agua es obligatoria y debe ser un número positivo" });
                return;
            }

            await this.hidratacionModel.registrarHidratacion(cantidad);
            res.status(201).json({ message: "Registro de hidratación guardado correctamente" });
        } catch (error) {
            console.error('Error al registrar hidratación:', error);
            res.status(500).json({ error: "Error al registrar hidratación" });
        }
    };

    public obtenerRegistros = async (_req: Request, res: Response): Promise<void> => {
        try {
            const registros = await this.hidratacionModel.obtenerRegistros();
            res.json(registros);
        } catch (error) {
            console.error('Error al obtener registros de hidratación:', error);
            res.status(500).json({ error: "Error al obtener registros de hidratación" });
        }
    };

    public obtenerTotalDiario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { fecha } = req.query;
            const total = await this.hidratacionModel.obtenerTotalDiario(fecha as string);
            res.json({ total });
        } catch (error) {
            console.error('Error al obtener total diario de hidratación:', error);
            res.status(500).json({ error: "Error al obtener total diario de hidratación" });
        }
    };

    public eliminarRegistro = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_registro } = req.params;
            
            if (!id_registro) {
                res.status(400).json({ error: "ID de registro es requerido" });
                return;
            }
            
            await this.hidratacionModel.eliminarRegistro(parseInt(id_registro));
            res.json({ message: "Registro eliminado correctamente" });
        } catch (error) {
            console.error('Error al eliminar registro de hidratación:', error);
            res.status(500).json({ error: "Error al eliminar registro de hidratación" });
        }
    };
}