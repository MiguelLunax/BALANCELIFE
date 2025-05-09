// BALANCELIFE/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionView.ts
import express, { Router } from 'express';
import Habito_AlimentacionController from './Habito_AlimentacionController';

export default class Habito_AlimentacionView {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const controller = new Habito_AlimentacionController();

    this.router.post('/registrar', controller.registrarAlimentacion);
    this.router.get('/estadisticas/mensual', controller.obtenerCaloriasPorMes);
    // this.router.delete('/eliminar/:id_registro', controller.eliminarRegistro);
  }
}