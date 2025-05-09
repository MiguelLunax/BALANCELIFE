// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionController.ts
import { Request, Response } from 'express';
import Habito_HidratacionModel from './Habito_HidratacionModel';

export default class Habito_HidratacionController {
  constructor(
    private hidratacionModel: Habito_HidratacionModel
  ) { }

  public registrarHidratacion = async (req: Request, res: Response): Promise<void> => {

    try {
      const { id_usuario, cantidad, fecha } = req.body;

      if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        res.status(400).json({ error: "La cantidad es obligatoria y debe ser positiva" });
        return;
      }

      await this.hidratacionModel.registrarHidratacion(id_usuario, cantidad, fecha); // Pasamos la fecha opcional
      res.status(200).json({ message: "Hidratación registrada correctamente" });
    } catch (error) {
      console.error('Error al registrar hidratación:', error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  // Nuevo endpoint para obtener estadísticas
  public getEstadisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_usuario, date } = req.body;

      const fecha = new Date(date as string);
      const mes = fecha.getMonth() + 1; // para debug
      const anio = fecha.getFullYear();

      if (isNaN(mes) || isNaN(anio)) {
        res.status(400).json({ success: false, message: "Fecha inválida" });
        return;
      }

      const idUsuarioNumber = parseInt(id_usuario as string, 10);
      if (isNaN(idUsuarioNumber)) {
        res.status(400).json({ success: false, message: "ID de usuario inválido" });
        return;
      }

      const estadisticas = await this.hidratacionModel.obtenerEstadisticas(idUsuarioNumber, mes, anio);

      res.status(200).json({ success: true, message: "Estadísticas de Hidratación obtenidas correctamente", data: estadisticas });

    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: "Error al obtener estadísticas de hidratación" });
    }
  };
}