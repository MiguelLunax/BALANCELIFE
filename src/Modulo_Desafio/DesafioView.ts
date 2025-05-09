// BALANCELIFE/backend/src/Modulo_Desafio/DesafioView.ts
import express, { Router } from 'express';
import DesafioController from './DesafioController';

export default class DesafioView {
    public router: Router;

    constructor(private desafioController: DesafioController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/añadirDesafio', this.desafioController.añadirDesafio);
        this.router.get('/getDesafios', this.desafioController.getDesafios);
        this.router.get('/getDesafiosUsuario/:id_usuario', this.desafioController.getDesafiosUsuario);
        this.router.post('/aceptarDesafio', this.desafioController.aceptarDesafio);
        this.router.post('/registrarProgreso', this.desafioController.registrarProgreso);
        this.router.post('/completarDesafio', this.desafioController.completarDesafio);
        this.router.get('/isNull/:id_desafio', this.desafioController.isNull);
        this.router.get('/puntosGanados/:id_usuario', this.desafioController.puntosGanados);
    }
}