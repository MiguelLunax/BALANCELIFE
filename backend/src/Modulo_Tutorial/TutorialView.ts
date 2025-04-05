// BALANCELIFE/backend/src/Modulo_Tutorial/TutorialView.ts
import express, { Router } from 'express';
import TutorialController from './TutorialController';

export default class TutorialView {
  public router: Router;

  constructor(private tutorialController: TutorialController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/todos', this.tutorialController.obtenerTutoriales);
    this.router.get('/obtener/:id_tutorial', this.tutorialController.obtenerTutorialPorId);
    this.router.post('/marcarVisto', this.tutorialController.marcarTutorialComoVisto);
    this.router.get('/vistos', this.tutorialController.obtenerTutorialesVistos);
    this.router.get('/pendientes', this.tutorialController.obtenerTutorialesPendientes);
  }
}