// BALANCELIFE/backend/src/services/AuthService.ts
import Database from '../express/Database';
import bcrypt from 'bcrypt';

export default class AuthService {
    private static activeUserId: number | null = null;

    // Iniciar sesión y almacenar el usuario activo
    public static async login(email: string, password: string): Promise<boolean> {
        try {
            const query = `SELECT id_usuario, password FROM USUARIO WHERE email = ?`;
            const result = await Database.executeQuery(query, [email]);

            if (!Array.isArray(result) || result.length === 0) {
                return false; // Usuario no encontrado
            }

            const usuario = result[0];
            const passwordValida = await bcrypt.compare(password, usuario.password);

            if (!passwordValida) {
                return false; // Contraseña incorrecta
            }

            this.activeUserId = usuario.id_usuario;
            return true;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        }
    }

    // Obtener el usuario activo
    public static getActiveUserId(): number {
        if (this.activeUserId === null) {
            throw new Error("No hay un usuario activo");
        }
        return this.activeUserId;
    }

    // Establecer usuario activo (útil para pruebas o cuando se obtiene el ID de otra fuente)
    public static setActiveUserId(userId: number): void {
        this.activeUserId = userId;
    }

    // Cerrar sesión
    public static logout(): void {
        this.activeUserId = null;
    }

    public static clearActiveUserId(): void {
        AuthService.activeUserId = null;
    }

    // Verificar si hay un usuario activo
    public static isAuthenticated(): boolean {
        return this.activeUserId !== null;
    }
}