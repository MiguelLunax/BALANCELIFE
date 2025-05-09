// BALANCELIFE/backend/src/Modulo_InicioDeSesion/UsuarioView.ts
import express, { Router } from 'express';
import UsuarioController from './UsuarioController';

export default class UsuarioView {
    public router: Router;

    constructor(private usuarioController: UsuarioController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        // Rutas para la gestión de usuarios
        this.router.post('/registrar', this.usuarioController.registrar);
        this.router.post('/existeUsuario', this.usuarioController.existeUsuario);
        this.router.post('/iniciarSesion', this.usuarioController.iniciarSesion);
        this.router.put('/actualizarPerfil/:id_usuario', this.usuarioController.actualizarPerfil);
        this.router.delete('/eliminarUsuario/:id_usuario', this.usuarioController.eliminarUsuario);
        this.router.post('/habilitarHuella', this.usuarioController.habilitarHuella);
        this.router.post('/verifyLongToken', this.usuarioController.verifyLongToken);
    }
}