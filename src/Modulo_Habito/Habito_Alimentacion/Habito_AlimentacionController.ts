// BALANCELIFE/backend/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionController.ts
import { Request, Response } from 'express';
import Habito_AlimentacionModel from './Habito_AlimentacionModel';

export default class Habito_AlimentacionController {
  constructor(private alimentacionModel: Habito_AlimentacionModel) { }

  public registrarAlimentacion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tipo_comida, cantidad, calorias, fecha } = req.body;

      if (!tipo_comida) {
        res.status(400).json({ error: "El tipo de comida es requerido" });
        return;
      }

      if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        res.status(400).json({ error: "La cantidad debe ser un número positivo" });
        return;
      }

      if (!calorias || isNaN(calorias) || calorias < 0) {
        res.status(400).json({ error: "Las calorías deben ser un número no negativo" });
        return;
      }

      await this.alimentacionModel.registrarAlimentacion(tipo_comida, cantidad, calorias, fecha);
      res.status(201).json({ message: "Registro de alimentación guardado correctamente" });
    } catch (error) {
      console.error('Error al registrar alimentación:', error);
      res.status(500).json({ error: "Error al registrar alimentación" });
    }
  };

  public obtenerRegistros = async (_req: Request, res: Response): Promise<void> => {
    try {
      const registros = await this.alimentacionModel.obtenerRegistros();
      res.json(registros);
    } catch (error) {
      console.error('Error al obtener registros de alimentación:', error);
      res.status(500).json({ error: "Error al obtener registros de alimentación" });
    }
  };

  public obtenerTotalCaloriasDiario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fecha } = req.query;
      const total = await this.alimentacionModel.obtenerTotalCaloriasDiario(fecha as string);
      res.json({ total });
    } catch (error) {
      console.error('Error al obtener total de calorías diario:', error);
      res.status(500).json({ error: "Error al obtener total de calorías diario" });
    }
  };

  public eliminarRegistro = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_registro } = req.params;

      if (!id_registro) {
        res.status(400).json({ error: "ID de registro es requerido" });
        return;
      }

      await this.alimentacionModel.eliminarRegistro(parseInt(id_registro));
      res.json({ message: "Registro eliminado correctamente" });
    } catch (error) {
      console.error('Error al eliminar registro de alimentación:', error);
      res.status(500).json({ error: "Error al eliminar registro de alimentación" });
    }
  };

  public obtenerEstadisticasPorTipoComida = async (_req: Request, res: Response): Promise<void> => {
    try {
      const estadisticas = await this.alimentacionModel.obtenerEstadisticasPorTipoComida();
      res.json(estadisticas);
    } catch (error) {
      console.error('Error al obtener estadísticas por tipo de comida:', error);
      res.status(500).json({ error: "Error al obtener estadísticas por tipo de comida" });
    }
  };
}