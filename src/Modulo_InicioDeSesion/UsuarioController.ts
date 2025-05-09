// BALANCELIFE/backend/src/Modulo_InicioDeSesion/UsuarioController.ts
import { Request, Response } from 'express';
import UsuarioModel from './UsuarioModel';
import AuthService from '../services/AuthService';

export default class UsuarioController {
    constructor(private usuarioModel: UsuarioModel) {}

    public registrar = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = req.body;
            
            // Validar datos requeridos
            if (!usuario.nombre || !usuario.email || !usuario.password) {
                res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
                return;
            }
            
            // Verificar si el usuario ya existe
            const existe = await this.usuarioModel.existeUsuario(usuario.email);
            if (existe) {
                res.status(409).json({ error: 'El email ya está registrado' });
                return;
            }
            
            await this.usuarioModel.registrar(usuario);
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    };

    public existeUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email es requerido' });
                return;
            }
            
            const existe = await this.usuarioModel.existeUsuario(email);
            res.json({ existe });
        } catch (error) {
            console.error('Error al verificar usuario:', error);
            res.status(500).json({ error: 'Error al verificar usuario' });
        }
    };

    public iniciarSesion = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                res.status(400).json({ error: 'Email y contraseña son requeridos' });
                return;
            }
            
            const usuario = await this.usuarioModel.iniciarSesion(email, password);
            
            if (usuario) {
                // Establecer el usuario activo en AuthService
                AuthService.setActiveUserId(usuario.id_usuario);
                res.json(usuario);
            } else {
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    };
   
    public actualizarPerfil = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            const usuario = req.body;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            await this.usuarioModel.actualizarPerfil(parseInt(id_usuario), usuario);
            res.json({ message: 'Perfil actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            res.status(500).json({ error: 'Error al actualizar perfil' });
        }
    };

    public actualizarNivel = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario, nivel } = req.body;
            
            if (!id_usuario || nivel === undefined) {
                res.status(400).json({ error: 'ID de usuario y nivel son requeridos' });
                return;
            }
            
            await this.usuarioModel.actualizarNivel(id_usuario, nivel);
            res.json({ message: 'Nivel actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar nivel:', error);
            res.status(500).json({ error: 'Error al actualizar nivel' });
        }
    };

    public actualizarPuntos = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario, puntos } = req.body;
            
            if (!id_usuario || puntos === undefined) {
                res.status(400).json({ error: 'ID de usuario y puntos son requeridos' });
                return;
            }
            
            await this.usuarioModel.actualizarPuntos(id_usuario, puntos);
            res.json({ message: 'Puntos actualizados correctamente' });
        } catch (error) {
            console.error('Error al actualizar puntos:', error);
            res.status(500).json({ error: 'Error al actualizar puntos' });
        }
    };

    public obtenerUsuarios = async (_req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await this.usuarioModel.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    };

    public obtenerUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            const usuario = await this.usuarioModel.obtenerUsuario(parseInt(id_usuario));
            
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: 'Error al obtener usuario' });
        }
    };

    public eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            await this.usuarioModel.eliminarUsuario(parseInt(id_usuario));
            res.json({ message: 'Usuario eliminado correctamente.' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    };

    public obtenerPuntos = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id_usuario } = req.params;
            
            if (!id_usuario) {
                res.status(400).json({ error: 'ID de usuario es requerido' });
                return;
            }
            
            const puntos = await this.usuarioModel.obtenerPuntos(parseInt(id_usuario));
            
            if (puntos !== null) {
                res.json({ puntos });
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener puntos:', error);
            res.status(500).json({ error: 'Error al obtener puntos' });
        }
    };
    public cambiarCorreo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nuevo_correo } = req.body;
            const { id_usuario } = req.params;

            if (!id_usuario || !nuevo_correo) {
                res.status(400).json({ error: 'ID de usuario y nuevo correo son requeridos' });
                return;
            }

            await this.usuarioModel.cambiarCorreo(parseInt(id_usuario), nuevo_correo);
            res.json({ message: 'Correo actualizado correctamente' });
        } catch (error) {
            console.error('Error al cambiar correo:', error);
            res.status(500).json({ error: 'Error al cambiar correo' });
        }
    };

    // En UsuarioController.ts


public cambiarContrasena = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_usuario, nueva_contrasena } = req.body;

        if (!id_usuario || !nueva_contrasena) {
            res.status(400).json({ error: 'ID de usuario y nueva contraseña son requeridos' });
            return;
        }
        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar contraseña' });
    }
};

}