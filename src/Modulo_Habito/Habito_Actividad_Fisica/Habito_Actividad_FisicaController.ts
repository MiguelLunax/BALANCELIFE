// BALANCELIFE/src/Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaController.ts
import { Request, Response } from 'express';
import Habito_Actividad_FisicaModel from './Habito_Actividad_FisicaModel';

export default class Habito_Actividad_FisicaController {
  private model: Habito_Actividad_FisicaModel;

  constructor() {
    this.model = new Habito_Actividad_FisicaModel();
  }

  // Registrar nueva actividad física
  public registrarActividad = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, pasos, kilometros, fecha } = req.body;

      if (!usuario_id || isNaN(usuario_id)) {
        res.status(400).json({ error: "ID de usuario es requerido" });
        return;
      }

      if (!pasos && pasos !== 0) {
        res.status(400).json({ error: "Pasos es un campo obligatorio" });
        return;
      }

      if (!kilometros && kilometros !== 0) {
        res.status(400).json({ error: "Kilómetros es un campo obligatorio" });
        return;
      }

      await this.model.registrarActividad(usuario_id, pasos, kilometros, fecha);
      res.status(201).json({ message: "Actividad física registrada correctamente" });
    } catch (error) {
      console.error('Error al registrar actividad física:', error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  // Obtener estadísticas mensuales
  public obtenerEstadisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, mes, anio } = req.body;

      if (!usuario_id || isNaN(parseInt(usuario_id as string))) {
        res.status(400).json({ error: "ID de usuario es requerido" });
        return;
      }

      if (!mes || !anio || isNaN(parseInt(mes as string)) || isNaN(parseInt(anio as string))) {
        res.status(400).json({ error: "Mes y año son requeridos" });
        return;
      }

      const estadisticas = await this.model.obtenerEstadisticas(
        parseInt(usuario_id as string),
        parseInt(mes as string),
        parseInt(anio as string)
      );

      res.status(200).json({ success: true, message: "Estadísticas de Actividad Fisica obtenidas correctamente", data: estadisticas });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: "Error al obtener estadísticas de actividad física" });
    }
  };
}