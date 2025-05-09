// BALANCELIFE/backend/src/Modulo_InicioDeSesion/UsuarioModel.ts
import Database from '../express/Database';
import UsuarioInterface from '../Types/Usuario';
import bcrypt from 'bcrypt';

export default class UsuarioModel {
    public async registrar(usuario: UsuarioInterface): Promise<any> {
        // Encriptar contraseña si existe

        const query = `INSERT INTO Usuario  (email, user_name, password) VALUES (?, ?, ?)`;

        const params = [
            usuario.email,
            usuario.nombre,
            usuario.password
        ];

        return await Database.executeQuery(query, params);
    }

    public async existeUsuario(email: string): Promise<boolean> {
        const query = `SELECT COUNT(*) AS cantidad FROM Usuario WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);
        return result[0].cantidad > 0;
    }

    public async iniciarSesion(email: string, password: string): Promise<any> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos, password 
                       FROM USUARIO WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);

        if (!Array.isArray(result) || result.length === 0) return null;

        const usuario = result[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) return null;

        delete usuario.password; // Eliminamos la contraseña antes de retornarla
        return usuario;
    }

    public async actualizarPerfil(_id_usuario: number, usuario: UsuarioInterface): Promise<any> {
        const query = `UPDATE USUARIO 
                       SET nombre = ?, email = ?, peso = ?, altura = ?, edad = ?, genero = ?, 
                           meta_diaria_agua = ?, meta_horas_sueno = ? 
                       WHERE id_usuario = ?`;

        const params = [
            usuario.nombre,
            usuario.email

        ];

        return await Database.executeQuery(query, params);
    }

    public async actualizarNivel(id_usuario: number, nivel: number): Promise<any> {
        const query = `UPDATE USUARIO SET nivel = ? WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [nivel, id_usuario]);
    }

    public async actualizarPuntos(id_usuario: number, puntos: number): Promise<any> {
        const query = `UPDATE USUARIO SET puntos = ? WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [puntos, id_usuario]);
    }

    public async obtenerUsuarios(): Promise<UsuarioInterface[]> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos 
                       FROM USUARIO`;
        return await Database.executeQuery(query);
    }

    public async obtenerUsuario(id_usuario: number): Promise<UsuarioInterface | null> {
        const query = `SELECT id_usuario, nombre, email, fecha_registro, peso, altura, edad, genero, 
                              meta_diaria_agua, meta_horas_sueno, nivel, puntos 
                       FROM USUARIO WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0] : null;
    }

    public async eliminarUsuario(id_usuario: number): Promise<any> {
        const query = `DELETE FROM USUARIO WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [id_usuario]);
    }

    public async obtenerPuntos(id_usuario: number): Promise<number | null> {
        const query = `SELECT puntos FROM USUARIO WHERE id_usuario = ?`;
        const result = await Database.executeQuery(query, [id_usuario]);
        return Array.isArray(result) && result.length > 0 ? result[0].puntos : null;
    }

    public async actualizarContrasena(id_usuario: number, nuevaContrasena: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10); // Encriptamos la nueva contraseña

        const query = `UPDATE USUARIO SET password = ? WHERE id_usuario = ?`;
        return await Database.executeQuery(query, [hashedPassword, id_usuario]);
    }

    public async verificarEmail(email: string): Promise<boolean> {
        const query = `SELECT email FROM USUARIO WHERE email = ?`;
        const result = await Database.executeQuery(query, [email]);
        return result.length > 0;
    }
    // En UsuarioModel.ts

    public async cambiarCorreo(id_usuario: number, nuevoCorreo: string): Promise<any> {
        const query = `UPDATE USUARIO SET email = ? WHERE id_usuario = ?`;
        const params = [nuevoCorreo, id_usuario];

        return await Database.executeQuery(query, params);
    }
    // En UsuarioModel.ts

    public async cambiarContrasena(id_usuario: number, nuevaContrasena: string): Promise<any> {
        const query = `UPDATE USUARIO SET password = ? WHERE id_usuario = ?`;
        const params = [nuevaContrasena, id_usuario];

        return await Database.executeQuery(query, params);
    }


}

