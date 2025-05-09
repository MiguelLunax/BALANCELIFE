// BALANCELIFE/backend/src/Modulo_Habito/Anadir_Habito/Anadir_HabitoController.ts
import { Request, Response } from 'express';
import Anadir_HabitoModel from './Anadir_HabitoModel';

export default class Anadir_HabitoController {
  constructor(private habitoModel: Anadir_HabitoModel) {}

  public crearHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { descripcion, frecuencia, tipo } = req.body;

      if (!descripcion || !frecuencia || !tipo) {
        res.status(400).json({ error: "Todos los campos son requeridos" });
        return;
      }

      await this.habitoModel.crearHabito(descripcion, frecuencia, tipo);
      res.status(201).json({ message: "Hábito creado exitosamente" });
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
      const habito = await this.habitoModel.obtenerHabitoPorId(parseInt(id_habito || '0'));
      if (habito) {
        res.json(habito);
      } else {
        res.status(404).json({ error: "Hábito no encontrado" });
      }
    } catch (error) {
      console.error('Error al obtener hábito por ID:', error);
      res.status(500).json({ error: "Error al obtener hábito" });
    }
  };

  public actualizarHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito } = req.params;
      const { descripcion, frecuencia, tipo } = req.body;

      if (!descripcion || !frecuencia || !tipo) {
        res.status(400).json({ error: "Todos los campos son requeridos" });
        return;
      }

      await this.habitoModel.actualizarHabito(
        parseInt(id_habito || '0'),
        descripcion as string,
        frecuencia as string,
        tipo as string
      );
      res.json({ message: "Hábito actualizado correctamente" });
    } catch (error) {
      console.error('Error al actualizar hábito:', error);
      res.status(500).json({ error: "Error al actualizar hábito" });
    }
  };

  public eliminarHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito } = req.params;
      await this.habitoModel.eliminarHabito(parseInt(id_habito || '0'));
      res.json({ message: "Hábito eliminado correctamente" });
    } catch (error) {
      console.error('Error al eliminar hábito:', error);
      res.status(500).json({ error: "Error al eliminar hábito" });
    }
  };

  public completarHabito = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_habito } = req.params;
      const { done } = req.body;

      if (typeof done !== 'boolean') {
        res.status(400).json({ error: "El campo 'done' debe ser booleano" });
        return;
      }

      await this.habitoModel.completarHabito(parseInt(id_habito || '0'), done);
      res.json({ message: `Hábito ${done ? 'completado' : 'marcado como no completado'} correctamente` });
    } catch (error) {
      console.error('Error al completar hábito:', error);
      res.status(500).json({ error: "Error al completar hábito" });
    }
  };
}
