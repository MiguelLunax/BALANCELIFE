// BALANCELIFE/src/Modulo_Habito/Habito_Sueno/Habito_SuenoController.ts
import { Request, Response } from 'express';
import Habito_SuenoModel from './Habito_SuenoModel';

export default class Habito_SuenoController {
  private model: Habito_SuenoModel;

  constructor() {
    this.model = new Habito_SuenoModel();
  }

  // Registrar nueva actividad de sueño
  public registrarSueno = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, duracion_horas, fecha } = req.body;

      if (!usuario_id || isNaN(usuario_id)) {
        res.status(400).json({ error: "ID de usuario es requerido" });
        return;
      }

      if (!duracion_horas && duracion_horas !== 0) {
        res.status(400).json({ error: "Duración en horas es un campo obligatorio" });
        return;
      }

      await this.model.registrarSueno(usuario_id, duracion_horas, fecha);
      res.status(201).json({ message: "Registro de sueño guardado correctamente" });
    } catch (error) {
      console.error('Error al registrar sueño:', error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  // Obtener estadísticas mensuales
  public obtenerEstadisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const {usuario_id, mes, anio } = req.body;

      if (!usuario_id || isNaN(parseInt(usuario_id as string))) {
        res.status(400).json({ success: false, error: "ID de usuario es requerido" });
        return;
      }

      if (!mes || !anio || isNaN(parseInt(mes as string)) || isNaN(parseInt(anio as string))) {
        res.status(400).json({ success: false, error: "Mes y año son requeridos" });
        return;
      }

      const estadisticas = await this.model.obtenerEstadisticas(
        parseInt(usuario_id as string),
        parseInt(mes as string),
        parseInt(anio as string)
      );

      res.status(200).json({ success: true, message: "Estadísticas de Sueño obtenidas correctamente", data: estadisticas });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: "Error al obtener estadísticas de sueño" });
    }
  };
}