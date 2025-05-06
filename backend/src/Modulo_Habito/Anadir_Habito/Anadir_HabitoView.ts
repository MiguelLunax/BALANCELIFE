// BALANCELIFE/backend/src/Modulo_Habito/Anadir_Habito/Anadir_HabitoView.ts
import express, { Router } from 'express';
import Anadir_HabitoController from './Anadir_HabitoController';

export default class Anadir_HabitoView {
  public router: Router;

  constructor(private habitoController: Anadir_HabitoController) {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.post('/crear', this.habitoController.crearHabito);
    this.router.get('/listar', this.habitoController.obtenerHabitos);
    this.router.get('/detalle/:id_habito', this.habitoController.obtenerHabitoPorId);
    this.router.put('/actualizar/:id_habito', this.habitoController.actualizarHabito);
    this.router.delete('/eliminar/:id_habito', this.habitoController.eliminarHabito);
    this.router.patch('/completar/:id_habito', this.habitoController.completarHabito);
  }
}
