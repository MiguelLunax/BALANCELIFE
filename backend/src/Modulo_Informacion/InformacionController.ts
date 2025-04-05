// BALANCELIFE/backend/src/Modulo_Informacion/InformacionController.ts
import { Request, Response } from 'express';
import InformacionModel from './InformacionModel';

export default class InformacionController {
  constructor(private informacionModel: InformacionModel) { }

  public obtenerArticulos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const articulos = await this.informacionModel.obtenerArticulos();
      res.json(articulos);
    } catch (error) {
      console.error('Error al obtener artículos:', error);
      res.status(500).json({ error: "Error al obtener artículos" });
    }
  };

  public obtenerArticuloPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_articulo } = req.params;

      if (!id_articulo) {
        res.status(400).json({ error: "ID de artículo es requerido" });
        return;
      }

      const articulo = await this.informacionModel.obtenerArticuloPorId(parseInt(id_articulo));

      if (articulo) {
        res.json(articulo);
      } else {
        res.status(404).json({ error: "Artículo no encontrado" });
      }
    } catch (error) {
      console.error('Error al obtener artículo:', error);
      res.status(500).json({ error: "Error al obtener artículo" });
    }
  };

  public obtenerArticulosPorCategoria = async (req: Request, res: Response): Promise<void> => {
    try {
      const { categoria } = req.params;

      if (!categoria) {
        res.status(400).json({ error: "Categoría es requerida" });
        return;
      }

      const articulos = await this.informacionModel.obtenerArticulosPorCategoria(categoria);
      res.json(articulos);
    } catch (error) {
      console.error('Error al obtener artículos por categoría:', error);
      res.status(500).json({ error: "Error al obtener artículos por categoría" });
    }
  };

  public marcarArticuloComoLeido = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_articulo } = req.body;

      if (!id_articulo) {
        res.status(400).json({ error: "ID de artículo es requerido" });
        return;
      }

      await this.informacionModel.marcarArticuloComoLeido(id_articulo);
      res.json({ message: "Artículo marcado como leído correctamente" });
    } catch (error) {
      console.error('Error al marcar artículo como leído:', error);
      res.status(500).json({ error: "Error al marcar artículo como leído" });
    }
  };

  public obtenerArticulosLeidos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const articulos = await this.informacionModel.obtenerArticulosLeidos();
      res.json(articulos);
    } catch (error) {
      console.error('Error al obtener artículos leídos:', error);
      res.status(500).json({ error: "Error al obtener artículos leídos" });
    }
  };
}