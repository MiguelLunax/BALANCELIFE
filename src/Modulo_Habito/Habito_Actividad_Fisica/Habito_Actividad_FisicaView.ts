// BALANCELIFE/src/Modulo_Habito/Habito_Actividad_Fisica/Habito_Actividad_FisicaView.ts
import express, { Router } from 'express';
import Habito_Actividad_FisicaController from './Habito_Actividad_FisicaController';

export default class Habito_Actividad_FisicaView {
  public router: Router;

  constructor(private actividadController: Habito_Actividad_FisicaController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post('/registrar', this.actividadController.registrarActividad);
    this.router.get('/estadisticas', this.actividadController.obtenerEstadisticas);
  }
}