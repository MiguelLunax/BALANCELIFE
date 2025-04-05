// BALANCELIFE/backend/src/Modulo_Logro/LogroView.ts
import express, { Router } from 'express';
import LogroController from './LogroController';

export default class LogroView {
    public router: Router;

    constructor(private logroController: LogroController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/todos', this.logroController.obtenerLogros);
        this.router.get('/usuario', this.logroController.obtenerLogrosUsuario);
        this.router.post('/desbloquear', this.logroController.desbloquearLogro);
        this.router.post('/crear', this.logroController.crearLogro);
        this.router.get('/verificar/hidratacion', this.logroController.verificarLogrosHidratacion);
    }
}