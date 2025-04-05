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
        this.router.put('/actualizarNivel', this.usuarioController.actualizarNivel);
        this.router.put('/actualizarPuntos', this.usuarioController.actualizarPuntos);
        this.router.get('/obtenerUsuarios', this.usuarioController.obtenerUsuarios);
        this.router.get('/obtenerUsuario/:id_usuario', this.usuarioController.obtenerUsuario);
        this.router.delete('/eliminarUsuario/:id_usuario', this.usuarioController.eliminarUsuario);
        this.router.get('/obtenerPuntos/:id_usuario', this.usuarioController.obtenerPuntos);
    }
}