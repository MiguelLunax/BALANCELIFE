// BALANCELIFE/backend/src/Modulo_Avatar/AvatarController.ts
import { Request, Response } from 'express';
import AvatarModel from './AvatarModel';

export default class AvatarController {
    constructor(private avatarModel: AvatarModel) {}

    public crearAvatar = async (req: Request, res: Response): Promise<void> => {
        try {
            const avatar = req.body;
            
            if (!avatar.color_piel || !avatar.genero || !avatar.color_ojos || !avatar.color_cabello) {
                res.status(400).json({ error: 'Todos los atributos del avatar son requeridos' });
                return;
            }
            
            const existe = await this.avatarModel.existeAvatar(1);
            
            if (existe) {
                res.status(409).json({ error: 'El usuario ya tiene un avatar' });
                return;
            }
            
            await this.avatarModel.crearAvatar(avatar);
            res.status(201).json({ message: 'Avatar creado correctamente' });
        } catch (error) {
            console.error('Error al crear avatar:', error);
            res.status(500).json({ error: 'Error al crear avatar' });
        }
    };

    public obtenerAvatar = async (_req: Request, res: Response): Promise<void> => {
        try {
            
            
            const avatar = await this.avatarModel.obtenerAvatar(1);
            
            if (avatar) {
                res.json(avatar);
            } else {
                res.status(404).json({ error: 'Avatar no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener avatar:', error);
            res.status(500).json({ error: 'Error al obtener avatar' });
        }
    };

    public actualizarAvatar = async (req: Request, res: Response): Promise<void> => {
        try {
            const avatar = req.body;
            
            if (!avatar.color_piel || !avatar.genero || !avatar.color_ojos || !avatar.color_cabello) {
                res.status(400).json({ error: 'Todos los atributos del avatar son requeridos' });
                return;
            }
            
            const existe = await this.avatarModel.existeAvatar(1);
            
            if (!existe) {
                res.status(404).json({ error: 'No existe un avatar para este usuario' });
                return;
            }
            
            await this.avatarModel.actualizarAvatar(avatar);
            res.json({ message: 'Avatar actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar avatar:', error);
            res.status(500).json({ error: 'Error al actualizar avatar' });
        }
    };
}