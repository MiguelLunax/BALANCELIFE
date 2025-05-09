// BALANCELIFE/backend/src/Modulo_Informacion/InformacionView.ts
import express, { Router } from 'express';
import InformacionController from './InformacionController';

export default class InformacionView {
  public router: Router;

  constructor(private informacionController: InformacionController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/articulos', this.informacionController.obtenerArticulos);
    this.router.get('/articulo/:id_articulo', this.informacionController.obtenerArticuloPorId);
    this.router.get('/categoria/:categoria', this.informacionController.obtenerArticulosPorCategoria);
    this.router.post('/marcarLeido', this.informacionController.marcarArticuloComoLeido);
    this.router.get('/leidos', this.informacionController.obtenerArticulosLeidos);
  }
}