// BALANCELIFE/backend/src/Modulo_Tutorial/TutorialController.ts
import { Request, Response } from 'express';
import TutorialModel from './TutorialModel';

export default class TutorialController {
  constructor(private tutorialModel: TutorialModel) { }

  public obtenerTutoriales = async (_req: Request, res: Response): Promise<void> => {
    try {
      const tutoriales = await this.tutorialModel.obtenerTutoriales();
      res.json(tutoriales);
    } catch (error) {
      console.error('Error al obtener tutoriales:', error);
      res.status(500).json({ error: "Error al obtener tutoriales" });
    }
  };

  public obtenerTutorialPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_tutorial } = req.params;

      if (!id_tutorial) {
        res.status(400).json({ error: "ID de tutorial es requerido" });
        return;
      }

      const tutorial = await this.tutorialModel.obtenerTutorialPorId(parseInt(id_tutorial));

      if (tutorial) {
        res.json(tutorial);
      } else {
        res.status(404).json({ error: "Tutorial no encontrado" });
      }
    } catch (error) {
      console.error('Error al obtener tutorial:', error);
      res.status(500).json({ error: "Error al obtener tutorial" });
    }
  };

  public marcarTutorialComoVisto = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_tutorial } = req.body;

      if (!id_tutorial) {
        res.status(400).json({ error: "ID de tutorial es requerido" });
        return;
      }

      await this.tutorialModel.marcarTutorialComoVisto(id_tutorial);
      res.json({ message: "Tutorial marcado como visto correctamente" });
    } catch (error) {
      console.error('Error al marcar tutorial como visto:', error);
      res.status(500).json({ error: "Error al marcar tutorial como visto" });
    }
  };

  public obtenerTutorialesVistos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const tutoriales = await this.tutorialModel.obtenerTutorialesVistos();
      res.json(tutoriales);
    } catch (error) {
      console.error('Error al obtener tutoriales vistos:', error);
      res.status(500).json({ error: "Error al obtener tutoriales vistos" });
    }
  };

  public obtenerTutorialesPendientes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const tutoriales = await this.tutorialModel.obtenerTutorialesPendientes();
      res.json(tutoriales);
    } catch (error) {
      console.error('Error al obtener tutoriales pendientes:', error);
      res.status(500).json({ error: "Error al obtener tutoriales pendientes" });
    }
  };
}