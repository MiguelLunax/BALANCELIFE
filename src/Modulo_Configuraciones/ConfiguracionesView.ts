import express, { Router } from 'express';
import ConfiguracionesController from './ConfiguracionesController';

export default class ConfiguracionesView {
    public router: Router;

    constructor(private configuracionesController: ConfiguracionesController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id_usuario', this.configuracionesController.obtenerConfiguraciones);
        this.router.post('/:id_usuario', this.configuracionesController.guardarConfiguraciones);
        this.router.post('/:id_usuario/restablecer', this.configuracionesController.restablecerConfiguracionesPorDefecto);
    }
}
