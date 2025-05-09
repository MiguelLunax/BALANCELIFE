// BALANCELIFE/backend/src/Modulo_Estadistica/EstadisticaView.ts
import express, { Router } from 'express';
import EstadisticaController from './EstadisticaController';

export default class EstadisticaView {
    public router: Router;

    constructor(private estadisticaController: EstadisticaController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/hidratacion', this.estadisticaController.obtenerEstadisticasHidratacion);
        this.router.get('/sueno', this.estadisticaController.obtenerEstadisticasSueno);
        this.router.get('/actividad', this.estadisticaController.obtenerEstadisticasActividad);
        this.router.get('/resumen', this.estadisticaController.obtenerResumenGeneral);
    }
}