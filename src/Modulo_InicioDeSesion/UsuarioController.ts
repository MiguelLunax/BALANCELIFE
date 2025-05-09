import { Request, Response } from 'express';
import UsuarioModel from './UsuarioModel';
import bcrypt from 'bcrypt';
import AuthService from '../services/AuthService';

export default class UsuarioController {
    constructor(private usuarioModel: UsuarioModel) { }

    public registrar = async (req: Request, res: Response): Promise<void> => {

        try {
            const usuario = req.body;
            if (!usuario.nombre || !usuario.email || !usuario.password || !usuario.fecha_nacimiento) {
                res.status(400).json({ success: false, message: 'Nombre, email y contraseña son obligatorios' });
                return;
            }

            // Verificar si el usuario ya existe
            if (await this.usuarioModel.existeUsuario(usuario.email)) {
                res.status(409).json({ success: false, message: 'El email ya está registrado' });
                return;
            }

            usuario.password = await bcrypt.hash(usuario.password, 10);
            await this.usuarioModel.registrar(usuario);

            const payload = {
                email: usuario.email,
            }
            const tokenSesion = AuthService.generarTokenSesion(payload);

            res.status(200).json({ success: true, message: 'Usuario registrado correctamente', token: tokenSesion });

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'Error al registrar usuario' });
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

            if (!usuario) {
                res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
                return;
            }


            const payload = {
                email: email,
            }
            const tokenSesion = AuthService.generarTokenSesion(payload);
            res.status(200).json({ success: true, data: usuario, token: tokenSesion });

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
            return;
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


    // Endpoint para habilitar la huella dactilar
    public habilitarHuella = async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        try {
            if (!email) {
                res.status(400).json({ error: 'Email es requerido' });
                return;
            }
            const longLivedToken = AuthService.generarLongToken({ email });
            res.status(200).json({ tokenSesion: longLivedToken });
        } catch (error) {
            console.error('Error al renovar token:', error);
            res.status(500).json({ error: 'Error al renovar token' });
        }
    };


    public verifyLongToken = async (req: Request, res: Response): Promise<void> => {
        
        try {
            const { longToken } = req.body;
            if (!longToken) {
                res.status(400).json({ error: 'Token de inicio requerido' });
                return;
            }
            const decoded = AuthService.verificarLongToken(longToken);
            if (!decoded) {
                res.status(401).json({ error: 'Token inválido o expirado' });
                return;
            }
            const newToken = AuthService.generarTokenSesion({
                email: decoded.email,
            });
            res.status(200).json({ tokenSesion: newToken });

        } catch (error) {
            console.error('Error al renovar token:', error);
            res.status(500).json({ error: 'Error al renovar token' });
        }
    };

}