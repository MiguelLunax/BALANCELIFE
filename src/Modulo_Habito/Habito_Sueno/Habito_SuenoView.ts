// BALANCELIFE/src/Modulo_Habito/Habito_Sueno/Habito_SuenoView.ts
import express, { Router } from 'express';
import Habito_SuenoController from './Habito_SuenoController';

export default class Habito_SuenoView {
  public router: Router;

  constructor(private suenoController: Habito_SuenoController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post('/registrar', this.suenoController.registrarSueno);
    this.router.post('/estadisticas', this.suenoController.obtenerEstadisticas);
  }
}