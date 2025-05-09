// BALANCELIFE/backend/src/services/AuthService.ts
import Database from '../express/Database';
import bcrypt from 'bcrypt';

export default class AuthService {
   

    // Iniciar sesión y almacenar el usuario activo
    public static async login(email: string, password: string): Promise<boolean> {
        try {
            const query = `SELECT id_usuario, password FROM Usuario WHERE email = ?`;
            const result = await Database.executeQuery(query, [email]);

            if (!Array.isArray(result) || result.length === 0) {
                return false; // Usuario no encontrado
            }

            const usuario = result[0];
            const passwordValida = await bcrypt.compare(password, usuario.password);

            if (!passwordValida) {
                return false; // Contraseña incorrecta
            }

            return true;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    }
}