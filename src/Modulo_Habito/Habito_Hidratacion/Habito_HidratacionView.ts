// BALANCELIFE/src/Modulo_Habito/Habito_Hidratacion/Habito_HidratacionView.ts
import express, { Router } from 'express';
import Habito_HidratacionController from './Habito_HidratacionController';

export default class Habito_HidratacionView {
    public router: Router;

    constructor(private hidratacionController: Habito_HidratacionController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/registrar', this.hidratacionController.registrarHidratacion);
        this.router.get('/estadisticas', this.hidratacionController.getEstadisticas);
    }
}