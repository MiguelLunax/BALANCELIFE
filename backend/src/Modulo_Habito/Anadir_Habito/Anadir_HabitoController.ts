// BALANCELIFE/backend/src/Modulo_Habito/Anadir_Habito/Anadir_HabitoController.ts
import { Request, Response } from 'express';
import Anadir_HabitoModel from './Anadir_HabitoModel';

export default class Anadir_HabitoController {
  constructor(private habitoModel: Anadir_HabitoModel) { }

  public crearHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descripcion, frecuencia, tipo } = req.body;

      if (!descripcion) {
        res.status(400).json({ error: "La descripción del hábito es requerida" });
        return;
      }

      if (!frecuencia) {
        res.status(400).json({ error: "La frecuencia es requerida" });
        return;
      }

      if (!tipo) {
        res.status(400).json({ error: "El tipo de hábito es requerido" });
        return;
      }

      await this.habitoModel.crearHabito(descripcion, frecuencia, tipo);
      res.status(201).json({ message: "Hábito creado correctamente" });
    } catch (error) {
      console.error('Error al crear hábito:', error);
      res.status(500).json({ error: "Error al crear hábito" });
    }
  };

  public obtenerHabitos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const habitos = await this.habitoModel.obtenerHabitos();
      res.json(habitos);
    } catch (error) {
      console.error('Error al obtener hábitos:', error);
      res.status(500).json({ error: "Error al obtener hábitos" });
    }
  };

  public obtenerHabitoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito } = req.params;

      if (!id_habito) {
        res.status(400).json({ error: "ID de hábito es requerido" });
        return;
      }

      const habito = await this.habitoModel.obtenerHabitoPorId(parseInt(id_habito));

      if (habito) {
        res.json(habito);
      } else {
        res.status(404).json({ error: "Hábito no encontrado" });
      }
    } catch (error) {
      console.error('Error al obtener hábito:', error);
      res.status(500).json({ error: "Error al obtener hábito" });
    }
  };

  public actualizarHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito, descripcion, frecuencia, tipo } = req.body;

      if (!id_habito) {
        res.status(400).json({ error: "ID de hábito es requerido" });
        return;
      }

      if (!descripcion) {
        res.status(400).json({ error: "La descripción del hábito es requerida" });
        return;
      }

      if (!frecuencia) {
        res.status(400).json({ error: "La frecuencia es requerida" });
        return;
      }

      if (!tipo) {
        res.status(400).json({ error: "El tipo de hábito es requerido" });
        return;
      }

      await this.habitoModel.actualizarHabito(id_habito, descripcion, frecuencia, tipo);
      res.json({ message: "Hábito actualizado correctamente" });
    } catch (error) {
      console.error('Error al actualizar hábito:', error);
      res.status(500).json({ error: "Error al actualizar hábito" });
    }
  };

  public eliminarHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito } = req.params;

      if (!id_habito) {
        res.status(400).json({ error: "ID de hábito es requerido" });
        return;
      }

      await this.habitoModel.eliminarHabito(parseInt(id_habito));
      res.json({ message: "Hábito eliminado correctamente" });
    } catch (error) {
      console.error('Error al eliminar hábito:', error);
      res.status(500).json({ error: "Error al eliminar hábito" });
    }
  };
}