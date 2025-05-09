import jwt from "jsonwebtoken";


const ACCESS_TOKEN_EXPIRATION = '1h'; // Token de sesión
const REFRESH_TOKEN_EXPIRATION = '7d'; // Token largo plazo


export default class AuthService {

    // Crear token de sesión
    static generarTokenSesion(payload: object): string {
        const secret = process.env["ACCESS_TOKEN_SECRET"];
        if (!secret) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
        }
        return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    }

    // Crear token de inicio largo (refresh)
    static generarLongToken(payload: object): string {
        const secret = process.env['LONG_TOKEN_SECRET'];
        if (!secret) {
            throw new Error("LONG_TOKEN_SECRET is not defined in environment variables.");
        }
        return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    }

    // Verificar token de sesión
    static verificarTokenSesion(token: string): any {
        try {
            const secret = process.env["ACCESS_TOKEN_SECRET"];
            if (!secret) {
                throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables.");
            }
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }

    // Verificar token de inicio largo
    static verificarLongToken(token: string): any {
        try {
            const secret = process.env["LONG_TOKEN_SECRET"];
            if (!secret) {
                throw new Error("LONG_TOKEN_SECRET is not defined in environment variables.");
            }
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }
}
