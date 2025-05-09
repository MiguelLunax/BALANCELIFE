// BALANCELIFE/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionController.ts
import { Request, Response } from 'express';
import Habito_AlimentacionModel from './Habito_AlimentacionModel';

export default class Habito_AlimentacionController {
  private model: Habito_AlimentacionModel;

  constructor() {
    this.model = new Habito_AlimentacionModel();
  }

  // Registrar alimentación
  public registrarAlimentacion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, tipo_comida, calorias, fecha } = req.body;


      if (!tipo_comida) {
        res.status(400).json({ error: "Tipo de comida es requerido" });
        return;
      }

      if (!calorias || isNaN(calorias) || calorias < 0) {
        res.status(400).json({ error: "Las calorías deben ser un número no negativo" });
        return;
      }

      await this.model.registrarAlimentacion(usuario_id, tipo_comida, calorias, fecha);
      res.status(201).json({ message: "Registro de alimentación guardado correctamente" });
    } catch (error) {
      console.error('Error al registrar alimentación:', error);
      res.status(500).json({ error: "Error al registrar alimentación" });
    }
  };

  // Obtener datos mensuales
  public obtenerCaloriasPorMes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario_id, mes, anio } = req.body;

      if (!usuario_id || isNaN(parseInt(usuario_id as string))) {
        res.status(400).json({ success: false, error: "ID de usuario es requerido" });
        return;
      }

      if (!mes || !anio || isNaN(parseInt(mes as string)) || isNaN(parseInt(anio as string))) {
        res.status(400).json({  success: false, error: "Mes y año son requeridos" });
        return;
      }

      const registros = await this.model.obtenerCaloriasPorMes(
        parseInt(usuario_id as string),
        parseInt(mes as string),
        parseInt(anio as string)
      );

      res.status(200).json({ success: true, message: "Calorías por mes obtenidas correctamente", data: registros });
    } catch (error) {
      console.error('Error al obtener calorías por mes:', error);
      res.status(500).json({ error: "Error al obtener calorías por mes" });
    }
  };
}