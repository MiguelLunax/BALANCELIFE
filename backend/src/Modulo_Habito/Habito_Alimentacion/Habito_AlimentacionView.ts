// BALANCELIFE/backend/src/Modulo_Habito/Habito_Alimentacion/Habito_AlimentacionView.ts
import express, { Router } from 'express';
import Habito_AlimentacionController from './Habito_AlimentacionController';

export default class Habito_AlimentacionView {
  public router: Router;

  constructor(private alimentacionController: Habito_AlimentacionController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post('/registrar', this.alimentacionController.registrarAlimentacion);
    this.router.get('/registros', this.alimentacionController.obtenerRegistros);
    this.router.get('/totalCalorias', this.alimentacionController.obtenerTotalCaloriasDiario);
    this.router.delete('/eliminar/:id_registro', this.alimentacionController.eliminarRegistro);
    this.router.get('/estadisticas/tipoComida', this.alimentacionController.obtenerEstadisticasPorTipoComida);
  }
}