// BALANCELIFE/backend/src/Modulo_Configuraciones/ConfiguracionesView.ts
import express, { Router } from 'express';
import ConfiguracionesController from './ConfiguracionesController';

export default class ConfiguracionesView {
    public router: Router;

    constructor(private configuracionesController: ConfiguracionesController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/obtener', this.configuracionesController.obtenerConfiguraciones);
        this.router.post('/guardar', this.configuracionesController.guardarConfiguraciones);
        this.router.post('/restablecer', this.configuracionesController.restablecerConfiguracionesPorDefecto);
    }
}