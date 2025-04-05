// BALANCELIFE/backend/src/Modulo_Avatar/AvatarView.ts
import express, { Router } from 'express';
import AvatarController from './AvatarController';

export default class AvatarView {
    public router: Router;

    constructor(private avatarController: AvatarController) {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/crear', this.avatarController.crearAvatar);
        this.router.get('/obtener/:id_usuario?', this.avatarController.obtenerAvatar);
        this.router.put('/actualizar', this.avatarController.actualizarAvatar);
    }
}